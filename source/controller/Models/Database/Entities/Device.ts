import BaseEntity from "@/Tools/Database/Entity"
import { Column, Entity } from "typeorm"

/*
|-----------------------------
|  UserAgent model
|-----------------------------
|
| 
*/
@Entity()
export default class UserAgent extends BaseEntity {

    /**
     * Value
     * 
     */
    @Column({ type: "text", nullable: false, unique: true })
    declare public value: string

    /**
     * Device
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public device: string
}