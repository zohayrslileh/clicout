import { createContext, useContext } from "react"
import request from "@/Models/Server/Request"

/*
|-----------------------------
|  Plan
|-----------------------------
|
| 
*/
export default class Plan {

    /**
     * Context
     * 
     */
    public static readonly context = createContext<Plan | undefined>(undefined)

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Name
     * 
     */
    public name: string

    /**
     * Price
     * 
     */
    public price: number

    /**
     * Threads
     * 
     */
    public threads: number

    /**
     * Enable proxies
     * 
     */
    public enableProxies: boolean

    /**
     * Customize cities
     * 
     */
    public customizeCities: boolean

    /**
     * Customize devices
     * 
     */
    public customizeDevices: boolean

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitivePlan: PrimitivePlan) {

        // Set id
        this.id = primitivePlan.id

        // Set name
        this.name = primitivePlan.name

        // Set price
        this.price = primitivePlan.price

        // Set threads
        this.threads = primitivePlan.threads

        // Set enable proxies
        this.enableProxies = primitivePlan.enableProxies

        // Set customize cities
        this.customizeCities = primitivePlan.customizeCities

        // Set customize devices
        this.customizeDevices = primitivePlan.customizeDevices
    }

    /**
     * Context hook
     * 
     * @returns
     */
    public static useContext() {

        /**
         * Context
         */
        const context = useContext(this.context)

        // Check context
        if (!context) throw new Error("The context was not provided.")

        return context
    }

    /**
     * Find method
     * 
     * @returns
     */
    public static async find() {

        // Ask primitive plans
        const primitivePlans = await request<PrimitivePlan[]>({ url: "/main/plan" })

        // Initialize plans
        return primitivePlans.map(primitivePlan => new this(primitivePlan))
    }

    /**
     * Find one method
     * 
     * @returns
     */
    public static async findOne(id: unknown) {

        // Ask primitive plan
        const primitivePlan = await request<PrimitivePlan>({ url: `/main/plan/${id}` })

        // Initialize plan
        return new this(primitivePlan)
    }
}

/*
|-----------------------------
|  Primitive Plan
|-----------------------------
|
| 
*/
export interface PrimitivePlan {
    id: number
    name: string
    price: number
    threads: number
    enableProxies: boolean
    customizeCities: boolean
    customizeDevices: boolean
}