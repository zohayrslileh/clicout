import SubscriptionEntity from "@/Models/Database/Entities/Subscription"
import UnauthorizedException from "./Exception/Unauthorized"
import UserEntity from "@/Models/Database/Entities/User"
import { Signer } from "@/Models/Encryptor"
import Nowpay from "@/Models/Nowpay"
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
     * Create method
     * 
     * @returns
     */
    public static async create(data: unknown) {

        // Schema
        const schema = zod.object({
            username: zod.string().min(4).max(16),
            password: zod.string().min(4).max(16),
            email: zod.string().min(4).max(30)
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

        return await SubscriptionEntity.findOneBy({ user: { id: this.id } })
    }

    /**
     * Subscribe method
     * 
     * @returns
     */
    public async subscribe(plan: Plan, paymentMethod: string) {

        const payment = await Nowpay.post("/payment", {
            "price_amount": 3999.5,
            "price_currency": "usd",
            "pay_currency": "btc",
            "ipn_callback_url": "https://nowpayments.io",
            "order_id": "RGDBP-21314",
            "order_description": "Apple Macbook Pro 2019 x 1"
        })

        return [plan, paymentMethod, payment]
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