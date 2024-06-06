import { PromiseWithDependencies } from "@/Tools/Promise"
import { createContext, useContext } from "react"

/*
|-----------------------------
|  Subscription
|-----------------------------
|
| 
*/
export default class Subscription {

    /**
     * Context
     * 
     */
    public static readonly context = createContext<Subscription | undefined>(undefined)

    /**
     * Controller
     * 
     */
    public static readonly controller = createContext<PromiseWithDependencies<Subscription | undefined> | undefined>(undefined)

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Expire at
     * 
     */
    public expireAt: Date

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveSubscription: PrimitiveSubscription) {

        // Set id
        this.id = primitiveSubscription.id

        // Set expireAt
        this.expireAt = new Date(primitiveSubscription.expireAt)
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
}

/*
|-----------------------------
|  Primitive Subscription
|-----------------------------
|
| 
*/
export interface PrimitiveSubscription {
    id: number
    expireAt: string
}