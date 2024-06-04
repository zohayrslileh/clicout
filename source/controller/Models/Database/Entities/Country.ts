import BaseEntity from "@/Tools/Database/Entity"
import { Entity, OneToMany } from "typeorm"
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
     * Cities
     * 
     */
    @OneToMany(() => City, city => city.country)
    declare public cities: City[]
}