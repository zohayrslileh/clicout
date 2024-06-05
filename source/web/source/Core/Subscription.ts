import { createContext, useContext } from "react"
import Plan, { PrimitivePlan } from "./Plan"

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
    public static readonly context = createContext<Subscription>(undefined!)

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
     * Plan
     * 
     */
    public plan: Plan

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveSubscription: PrimitiveSubscription) {

        // Set id
        this.id = primitiveSubscription.id

        // Set expireAt
        this.expireAt = new Date(primitiveSubscription.expireAt)

        // Set plan
        this.plan = new Plan(primitiveSubscription.plan)
    }

    /**
     * Context hook
     * 
     * @returns
     */
    public static useContext() {

        return useContext(this.context)
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
    plan: PrimitivePlan
}