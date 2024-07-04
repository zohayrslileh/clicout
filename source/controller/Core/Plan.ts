import PlanEntity from "@/Models/Database/Entities/Plan"
import CoreException from "./Exception"
import zod from "zod"

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

        // Set price
        this.price = primitivePlan.price

        // Set threads
        this.threads = primitivePlan.threads

        // Set enable proxies
        this.enableProxies = primitivePlan.enableProxies

        // Set customize location
        this.customizeLocation = primitivePlan.customizeLocation

        // Set customize devices
        this.customizeDevices = primitivePlan.customizeDevices
    }

    /**
     * Find one method
     * 
     * @returns
     */
    public static async findOne(id: unknown) {

        // Plan entity
        const planEntity = await PlanEntity.findOneBy({ id: zod.number().parse(id) })

        // Check plan entity
        if (!planEntity) throw new CoreException("This plan was not found")

        // Initialize plan
        return new this(planEntity)
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
    threads: number
    description: string
    recommended: boolean
    enableProxies: boolean
    customizeDevices: boolean
    customizeLocation: boolean
}