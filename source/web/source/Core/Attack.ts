import { PromiseWithDependencies } from "@/Tools/Promise"
import { createContext, useContext } from "react"
import request from "@/Models/Server/Request"
import zod from "zod"

/*
|-----------------------------
|  Attack
|-----------------------------
|
| 
*/
export default class Attack {

    /**
     * Running controller
     * 
     */
    public static readonly runningController = createContext<PromiseWithDependencies<Attack[]> | undefined>(undefined)

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveAttack: PrimitiveAttack) {

        // Set id
        this.id = primitiveAttack.id
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(data: unknown) {

        // Schema
        const schema = zod.object({
            keywords: zod.array(zod.string().max(50)).min(1).max(20),
            domains: zod.array(zod.string().max(50)).max(20),
            domainsAction: zod.enum(["CLICK", "IGNORE"]),
            countryId: zod.number().min(1).optional(),
            cityId: zod.number().min(1).optional(),
            withProxies: zod.boolean(),
            device: zod.enum(["DESKTOP", "MOBILE"]).optional(),
            searches: zod.number().min(0)
        })

        // Ask primitive attack
        const primitiveAttack = await request<PrimitiveAttack>({
            method: "POST",
            url: "/main/attack",
            data: schema.parse(data)
        })

        return new this(primitiveAttack)
    }

    /**
     * Running method
     * 
     * @returns
     */
    public static async running() {

        // Ask primitive attacks
        const primitiveAttacks = await request<PrimitiveAttack[]>({ url: "/main/attack/running" })

        // Initialize attacks
        return primitiveAttacks.map(primitiveAttack => new this(primitiveAttack))
    }

    /**
     * Running controller hook
     * 
     * @returns
     */
    public static useRunningController() {

        /**
         * Running controller
         * 
         */
        const runningController = useContext(this.runningController)

        // Check running controller
        if (!runningController) throw new Error("The running controller was not provided.")

        return runningController
    }
}

/*
|-----------------------------
|  Primitive Attack
|-----------------------------
|
| 
*/
export interface PrimitiveAttack {
    id: number
}