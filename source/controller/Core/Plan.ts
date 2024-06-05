import PlanEntity from "@/Models/Database/Entities/Plan"

/*
|-----------------------------
|  Plan
|-----------------------------
|
| 
*/
export default class Plan {

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
     * Find method
     * 
     * @returns
     */
    public static async find() {

        // Plan entities
        const planEntities = await PlanEntity.find()

        // Initialize plans
        return planEntities.map(planEntity => new Plan(planEntity))
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