import SubscriptionEntity from "@/Models/Database/Entities/Subscription"
import CountryEntity from "@/Models/Database/Entities/Country"
import UnauthorizedException from "./Exception/Unauthorized"
import AttackEntity from "@/Models/Database/Entities/Attack"
import CityEntity from "@/Models/Database/Entities/City"
import UserEntity from "@/Models/Database/Entities/User"
import PlanEntity from "@/Models/Database/Entities/Plan"
import { Signer } from "@/Models/Encryptor"
import CoreException from "./Exception"
import { Namespace } from "socket.io"
import { IsNull } from "typeorm"
import Invoice from "./Invoice"
import Attack from "./Attack"
import Plan from "./Plan"
import zod from "zod"

/*
|-----------------------------
|  User
|-----------------------------
|
| 
*/
export default class User {

    /**
     * Namespace
     * 
     */
    public static namespace: Namespace | undefined

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Username
     * 
     */
    public username: string

    /**
     * Email
     * 
     */
    public email: string

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveUser: PrimitiveUser) {

        // Set id
        this.id = primitiveUser.id

        // Set username
        this.username = primitiveUser.username

        // Set email
        this.email = primitiveUser.email
    }

    /**
     * Get broadcast
     * 
     * @returns
     */
    public get broadcast() {

        return User.namespace ? User.namespace.to(this.id.toString()) : undefined
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(data: unknown) {

        // Schema
        const schema = zod.object({
            username: zod.string().regex(new RegExp("^[a-z0-9_-]{5,15}$")),
            password: zod.string().min(4).max(16),
            email: zod.string().email(),
            agreeTerms: zod.boolean().refine(agreeTerms => agreeTerms)
        })

        // Validate data
        const { username, password, email } = schema.parse(data)

        // Initialize user entity
        const userEntity = new UserEntity

        // Set username
        userEntity.username = username

        // Set email
        userEntity.email = email

        // Set password
        await userEntity.setPassword(password)

        // Save
        await userEntity.save()

        return new this(userEntity)
    }

    /**
     * Login method
     * 
     * @returns
     */
    public static async login(data: unknown) {

        // Schema
        const schema = zod.object({
            username: zod.string().min(4).max(16),
            password: zod.string().min(4).max(16)
        })

        // Validate data
        const { username, password } = schema.parse(data)

        // User entity
        const userEntity = await UserEntity.findOneBy({ username })

        // Check username and password
        if (!userEntity || !await userEntity.verifyPassword(password)) throw new UnauthorizedException("Username or password incorrect")

        return new this(userEntity)
    }

    /**
     * Authentication method
     * 
     * @returns
     */
    public static async authentication(authorization: unknown) {

        // Payload
        type Payload = { id: number }

        try {

            // Verify authorization
            const payload = Signer.verify<Payload>(zod.string().parse(authorization))

            // User entity
            var userEntity = await UserEntity.findOneByOrFail({ id: payload.id })
        }

        catch {

            throw new UnauthorizedException
        }

        return new this(userEntity)
    }

    /**
     * Create authorization method
     * 
     * @returns
     */
    public createAuthorization(): string {

        return Signer.sign({ id: this.id })
    }

    /**
     * Subscription method
     * 
     * @returns
     */
    public async subscription() {

        // Subscription entity
        var subscriptionEntity = await SubscriptionEntity.findOneBy({ user: { id: this.id }, paymentInvoice: IsNull() })

        return subscriptionEntity
    }

    /**
     * Plan method
     * 
     * @returns
     */
    public async plan() {

        // Plan entity
        var planEntity = await PlanEntity.findOneOrFail({ where: { subscriptions: [{ user: { id: this.id }, paymentInvoice: IsNull() }] } })

        return new Plan(planEntity)
    }

    /**
     * Subscribe method
     * 
     * @returns
     */
    public async subscribe(plan: Plan) {

        // Find plan entity
        const planEntity = await PlanEntity.findOneByOrFail({ id: plan.id })

        // Invoice
        var invoice: Invoice | undefined

        // Create invoice
        if (planEntity.price) invoice = await Invoice.create({ priceAmount: planEntity.price, payCurrency: "usdttrc20" })

        // Find user entity
        const userEntity = await UserEntity.findOneOrFail({ relations: { subscription: true }, where: { id: this.id } })

        // Create new subscription
        const subscriptionEntity = userEntity.subscription || new SubscriptionEntity

        // Set user entity
        if (!userEntity.subscription) subscriptionEntity.user = userEntity

        // Set plan entity
        subscriptionEntity.plan = planEntity

        // Set payment invoice
        subscriptionEntity.paymentInvoice = invoice ? invoice.id : null

        // Save
        await subscriptionEntity.save()

        return invoice ? invoice.paymentLink : subscriptionEntity
    }

    /**
     * Create attack method
     * 
     * @returns
     */
    public async createAttack(data: unknown) {

        // Schema
        const schema = zod.object({
            keywords: zod.array(zod.string().max(50)).min(1).max(20),
            domains: zod.array(zod.string().max(50)).max(20),
            domainsAction: zod.enum(["CLICK", "IGNORE"]),
            countryId: zod.number().min(1).optional(),
            cityId: zod.number().min(1).optional(),
            withProxies: zod.boolean(),
            device: zod.enum(["DESKTOP", "MOBILE"]).optional(),
            searches: zod.number().min(0)
        })

        // Validate data
        const { keywords, domains, domainsAction, countryId, cityId, withProxies, device, searches } = schema.parse(data)

        // Plan
        const plan = await this.plan()

        // Running attacks
        const runningAttacks = await this.runningAttacks()

        // Check threads
        if (plan.threads <= runningAttacks.length) throw new CoreException("Upgrade to launch more attacks")

        // Check customize location
        if (!plan.customizeLocation && (countryId || cityId)) throw new CoreException("Upgrade to customize location")

        // Check enable proxies
        if (!plan.enableProxies && withProxies) throw new CoreException("Upgrade to enable proxies")

        // Check customize devices
        if (!plan.customizeDevices && device) throw new CoreException("Upgrade to customize devices")

        // Check searches
        if (plan.searches && !searches) throw new CoreException("Upgrade to unlimited searchs")

        // Initialize attack entity
        const attackEntity = new AttackEntity

        // Set keywords
        attackEntity.keywords = keywords

        // Set domains
        attackEntity.domains = domains

        // Set domains action
        attackEntity.domainsAction = domainsAction

        // Set city
        attackEntity.city = cityId ? await CityEntity.findOneBy({ id: cityId }) : null

        // Set country
        attackEntity.country = !attackEntity.city && countryId ? await CountryEntity.findOneBy({ id: countryId }) : null

        // Set with proxies
        attackEntity.withProxies = withProxies

        // Set device
        attackEntity.device = device || null

        // Set searches
        attackEntity.searches = searches

        // Set status
        attackEntity.status = "RUNNING"

        // Set user
        attackEntity.user = await UserEntity.findOneByOrFail({ id: this.id })

        // Save
        await attackEntity.save()

        // Attck
        const attack = new Attack(attackEntity)

        // On record chunk
        attack.once("record-chunk", chunk => this.broadcast?.emit(`${attack.id}:record-chunk`, chunk))

        // Start
        attack.safeStart()

        return attack
    }

    /**
     * Running attacks
     * 
     * @returns
     */
    public async runningAttacks() {

        // Attack entities
        const attackEntities = await AttackEntity.findBy({ user: { id: this.id }, status: "RUNNING" })

        // Initialize attacks
        return attackEntities.map(attackEntity => new Attack(attackEntity))
    }

    /**
     * Find attack
     * 
     * @returns
     */
    public async findAttack(id: unknown) {

        // Attack entity
        const attackEntity = await AttackEntity.findOneByOrFail({ user: { id: this.id }, id: zod.number().parse(id) })

        // Initialize attack
        return new Attack(attackEntity)
    }
}

/*
|-----------------------------
|  Primitive User
|-----------------------------
|
| 
*/
export interface PrimitiveUser {
    id: number
    username: string
    email: string
}