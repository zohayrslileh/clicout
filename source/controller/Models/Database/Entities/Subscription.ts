import BaseEntity from "@/Tools/Database/Entity"
import { Entity, ManyToOne } from "typeorm"
import Plan from "./Plan"

/*
|-----------------------------
|  Subscription model
|-----------------------------
|
| 
*/
@Entity()
export default class Subscription extends BaseEntity {

    /**
     * Plan
     * 
     */
    @ManyToOne(() => Plan, plan => plan.subscriptions, { nullable: false })
    declare public plan: Plan
}