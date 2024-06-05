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