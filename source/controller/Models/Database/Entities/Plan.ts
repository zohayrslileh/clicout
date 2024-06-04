import { Column, Entity, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
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
     * Name
     * 
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    declare public name: string

    /**
     * Price
     * 
     */
    @Column({ type: "float", nullable: false })
    declare public price: number

    /**
     * Subscriptions
     * 
     */
    @OneToMany(() => Subscription, subscription => subscription.plan)
    declare public subscriptions: Subscription[]
}