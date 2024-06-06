import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Plan from "./Plan"
import User from "./User"

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

    /**
     * User
     * 
     */
    @OneToOne(() => User, user => user.subscription, { nullable: false })
    @JoinColumn()
    declare public user: User

    /**
     * Expire at
     * 
     */
    @Column({ type: "date", nullable: true })
    declare public expireAt: Date | null

    /**
     * Payment invoice
     * 
     */
    @Column({ type: "int", nullable: true })
    declare public paymentInvoice: number | null
}