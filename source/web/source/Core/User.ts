import Subscription, { PrimitiveSubscription } from "./Subscription"
import Authorization from "@/Models/Authorization"
import { createContext, useContext } from "react"
import request from "@/Models/Server/Request"
import usePromise from "@/Tools/Promise"
import { AxiosError } from "axios"
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
    public static readonly context = createContext<User>(undefined!)

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
            username: zod.string().min(4).max(16),
            password: zod.string().min(4).max(16)
        })

        // Ask authorization
        const authorization = await request<string>({
            method: "POST",
            url: "/auth/login",
            data: schema.parse(data)
        })

        // Set authorization
        Authorization.value = authorization
    }

    /**
     * Authentication method
     * 
     * @returns
     */
    public static async authentication() {

        // Ask primitive user
        const primitiveUser = await request<PrimitiveUser>({ url: "/main" })

        return new this(primitiveUser)
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
        const authentication = usePromise(async () => await this.authentication(), [])

        /**
         * Unauthorized
         * 
         */
        const unauthorized = authentication.exception && authentication.exception.current instanceof AxiosError && authentication.exception.current.response?.status === 401

        return Object.assign(authentication, { unauthorized })
    }

    /**
     * Context hook
     * 
     * @returns
     */
    public static useContext() {

        return useContext(this.context)
    }

    /**
     * Subscription method
     * 
     * @returns
     */
    public async subscription() {

        // Ask primitive subscription
        const primitiveSubscription = await request<PrimitiveSubscription | null>({ url: "/main/subscription" })

        return primitiveSubscription ? new Subscription(primitiveSubscription) : undefined
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