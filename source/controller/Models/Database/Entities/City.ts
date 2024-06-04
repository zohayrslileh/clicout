import { Column, Entity, ManyToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Country from "./Country"

/*
|-----------------------------
|  City model
|-----------------------------
|
| 
*/
@Entity()
export default class City extends BaseEntity {

    /**
     * Name
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public name: string

    /**
     * Latitude
     * 
     */
    @Column({ type: "float", nullable: false })
    declare public latitude: number

    /**
     * Longitude
     * 
     */
    @Column({ type: "float", nullable: false })
    declare public longitude: number

    /**
     * Country
     * 
     */
    @ManyToOne(() => Country, country => country.cities, { nullable: false })
    declare public country: Country
}