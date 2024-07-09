import usePromise, { PromiseWithDependencies } from "@/Tools/Promise"
import Subscription, { PrimitiveSubscription } from "./Subscription"
import Authorization from "@/Models/Authorization"
import { createContext, useContext } from "react"
import request from "@/Models/Server/Request"
import Plan, { PrimitivePlan } from "./Plan"
import manager from "@/Models/Server/Socket"
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
     * Context
     * 
     */
    public static readonly context = createContext<User | undefined>(undefined)

    /**
     * Controller
     * 
     */
    public static readonly controller = createContext<PromiseWithDependencies<User | undefined> | undefined>(undefined)

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
            username: zod.string({ required_error: "Username field is required" }).regex(new RegExp("^[a-z0-9_-]{5,15}$")),
            password: zod.string({ required_error: "Password field is required" }).min(4).max(16),
            email: zod.string({ required_error: "Email field is required" }).email(),
            agreeTerms: zod.boolean({ required_error: "Agree terms is required" }).refine(agreeTerms => agreeTerms)
        })

        // Ask primitive user
        const [primitiveUser, authorization] = await request<[PrimitiveUser, string]>({
            method: "POST",
            url: "/auth/register",
            data: schema.parse(data)
        })

        // Set authorization
        Authorization.value = authorization

        return new this(primitiveUser)
    }

    /**
     * Login method
     * 
     * @returns
     */
    public static async login(data: unknown) {

        // Schema
        const schema = zod.object({
            username: zod.string({ required_error: "Username field is required" }).min(4).max(16),
            password: zod.string({ required_error: "Password field is required" }).min(4).max(16)
        })

        // Ask authorization
        const [primitiveUser, authorization] = await request<[PrimitiveUser, string]>({
            method: "POST",
            url: "/auth/login",
            data: schema.parse(data)
        })

        // Set authorization
        Authorization.value = authorization

        return new this(primitiveUser)
    }

    /**
     * Authentication method
     * 
     * @returns
     */
    public static async authentication() {

        // Ask primitive user
        const primitiveUser = await request<PrimitiveUser | undefined>({ url: "/auth" })

        return primitiveUser ? new this(primitiveUser) : undefined
    }

    /**
     * Authentication hook
     * 
     * @returns
     */
    public static useAuthentication() {

        /**
         * Authentication promise
         * 
         */
        return usePromise(async () => await this.authentication(), [])
    }

    /**
     * Context hook
     * 
     * @returns
     */
    public static useContext() {

        /**
         * Context
         * 
         */
        const context = useContext(this.context)

        // Check context
        if (!context) throw new Error("The context was not provided.")

        return context
    }

    /**
     * Controller hook
     * 
     * @returns
     */
    public static useController() {

        /**
         * Controller
         * 
         */
        const controller = useContext(this.controller)

        // Check controller
        if (!controller) throw new Error("The controller was not provided.")

        return controller
    }

    /**
     * Subscription method
     * 
     * @returns
     */
    public async subscription() {

        // Ask primitive subscription
        const primitiveSubscription = await request<PrimitiveSubscription | undefined>({ url: "/main/subscription/current" })

        return primitiveSubscription ? new Subscription(primitiveSubscription) : undefined
    }

    /**
     * Plan method
     * 
     * @returns
     */
    public async plan() {

        // Ask primitive plan
        const primitivePlan = await request<PrimitivePlan>({ url: "/main/plan/current" })

        return new Plan(primitivePlan)
    }

    /**
     * Subscribe method
     * 
     * @returns
     */
    public async subscribe(plan: Plan) {

        // Ask primitive subscription
        const primitiveSubscription = await request<PrimitiveSubscription | "string">({
            url: `/main/plan/${plan.id}/subscribe`,
            method: "POST"
        })

        return typeof primitiveSubscription === "string" ? primitiveSubscription : new Subscription(primitiveSubscription)
    }

    /**
     * Namespace hook
     * 
     * @returns
     */
    public static useNamespace() {

        return manager.useNamespace("/main")
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