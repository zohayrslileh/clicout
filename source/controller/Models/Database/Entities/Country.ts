import { Column, Entity, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import City from "./City"

/*
|-----------------------------
|  Country model
|-----------------------------
|
| 
*/
@Entity()
export default class Country extends BaseEntity {

    /**
     * Code
     * 
     */
    @Column({ type: "varchar", nullable: false, unique: true })
    declare public code: string

    /**
     * Name
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public name: string

    /**
     * Cities
     * 
     */
    @OneToMany(() => City, city => city.country)
    declare public cities: City[]
}