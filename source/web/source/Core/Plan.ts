import { createContext, useContext } from "react"

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
    public static readonly context = createContext<Plan>(undefined!)

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
|  Primitive Plan
|-----------------------------
|
| 
*/
export interface PrimitivePlan {
    id: number
    name: string
    price: number
}