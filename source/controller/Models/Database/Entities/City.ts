import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Country from "./Country"
import Attack from "./Attack"
import Search from "./Search"

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

    /**
     * Attacks
     * 
     */
    @OneToMany(() => Attack, attack => attack.city)
    declare public attacks: Attack[]

    /**
     * Searchs
     * 
     */
    @OneToMany(() => Search, search => search.city)
    declare public searchs: Search[]
}