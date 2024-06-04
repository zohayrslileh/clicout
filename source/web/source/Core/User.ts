import Authorization from "@/Models/Authorization"
import request from "@/Models/Server/Request"
import usePromise from "@/Tools/Promise"
import { createContext } from "react"
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
    public static readonly context = createContext<User | undefined>(undefined)

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
     * Constructor methodd
     * 
     */
    public constructor(primitiveUser: PrimitiveUser) {

        // Set id
        this.id = primitiveUser.id

        // Set username
        this.username = primitiveUser.username
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
            password: zod.string().min(4).max(16)
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
}