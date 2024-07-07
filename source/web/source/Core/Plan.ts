import { GiBatteredAxe, GiBirdClaw, GiBladeBite } from "react-icons/gi"
import { createContext, useContext } from "react"
import request from "@/Models/Server/Request"
import { IconType } from "react-icons/lib"
import Color from "@/Tools/Color"

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
     * Description
     * 
     */
    public description: string

    /**
     * Recommended
     * 
     */
    public recommended: boolean

    /**
     * Avatar
     * 
     */
    public avatar: IconType

    /**
     * Color
     * 
     */
    public color: Color

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
     * Searches
     * 
     */
    public searches: number

    /**
     * Enable proxies
     * 
     */
    public enableProxies: boolean

    /**
     * Customize location
     * 
     */
    public customizeLocation: boolean

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

        // Set description
        this.description = primitivePlan.description

        // Set recommended
        this.recommended = primitivePlan.recommended

        // Set avatar
        this.avatar = avatars[primitivePlan.id - 1]

        // Set color
        this.color = colors[primitivePlan.id - 1]

        // Set price
        this.price = primitivePlan.price

        // Set threads
        this.threads = primitivePlan.threads

        // Set searches
        this.searches = primitivePlan.searches

        // Set enable proxies
        this.enableProxies = primitivePlan.enableProxies

        // Set customize location
        this.customizeLocation = primitivePlan.customizeLocation

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
    searches: number
    description: string
    recommended: boolean
    enableProxies: boolean
    customizeDevices: boolean
    customizeLocation: boolean
}

/**
 * Avatars
 * 
 */
export const avatars = [GiBatteredAxe, GiBirdClaw, GiBladeBite]

/**
 * Colors
 * 
 */
export const colors = [new Color("#71834e"), new Color("#ffb12c"), new Color("#7355ff")]