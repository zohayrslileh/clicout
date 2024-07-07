import BaseEntity from "@/Tools/Database/Entity"
import { Column, Entity } from "typeorm"

/*
|-----------------------------
|  Device model
|-----------------------------
|
| 
*/
@Entity()
export default class Device extends BaseEntity {

    /**
     * User agent
     * 
     */
    @Column({ type: "text", nullable: false, unique: true })
    declare public userAgent: string

    /**
     * Type
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public type: string
}