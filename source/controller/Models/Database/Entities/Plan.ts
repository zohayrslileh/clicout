import BaseEntity from "@/Tools/Database/Entity"
import { Entity, OneToMany } from "typeorm"
import Subscription from "./Subscription"

/*
|-----------------------------
|  Plan model
|-----------------------------
|
| 
*/
@Entity()
export default class Plan extends BaseEntity {

    /**
     * Subscriptions
     * 
     */
    @OneToMany(() => Subscription, subscription => subscription.plan)
    declare public subscriptions: Subscription[]
}