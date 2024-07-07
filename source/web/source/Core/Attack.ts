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
            domains: zod.array(zod.string().max(50)).min(1).max(20),
            domainsAction: zod.enum(["CLICK", "IGNORE"]),
            countryId: zod.number().min(1).optional(),
            cityId: zod.number().min(1).optional(),
            device: zod.enum(["DESKTOP", "MOBILE"]).optional(),
            searches: zod.number().min(0)
        })

        // Ask primitive attack
        const primitiveAttack = await request<PrimitiveAttack>({
            method: "POST",
            url: "/attack/create",
            data: schema.parse(data)
        })

        return new this(primitiveAttack)
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