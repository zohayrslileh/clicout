import request from "@/Models/Server/Request"
import usePromise from "@/Tools/Promise"
import { AxiosError } from "axios"
import { createContext } from "react"
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
        const primitiveUser = await request<PrimitiveUser>({
            method: "POST",
            url: "/auth/register",
            data: schema.parse(data)
        })

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

        // Ask primitive user
        const primitiveUser = await request<PrimitiveUser>({
            method: "POST",
            url: "/auth/login",
            data: schema.parse(data)
        })

        return new this(primitiveUser)
    }

    /**
     * Authentication method
     * 
     * @returns
     */
    public static async authentication() {

        // Ask primitive user
        const primitiveUser = await request<PrimitiveUser>({
            method: "POST",
            url: "/auth"
        })

        return new this(primitiveUser)
    }

    /**
     * Authentication hook
     * 
     * @returns
     */
    public static useAuthentication() {

        const user = usePromise(async () => await this.authentication(), [])

        const unauthorized = user.exception && user.exception.current instanceof AxiosError && user.exception.current.response?.status === 401

        return Object.assign(user, { unauthorized })
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