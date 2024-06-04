import BaseEntity from "@/Tools/Database/Entity"
import { Entity, ManyToOne } from "typeorm"
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
     * Country
     * 
     */
    @ManyToOne(() => Country, country => country.cities, { nullable: false })
    declare public country: Country
}