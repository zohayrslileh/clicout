import { Column, Entity, ManyToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Country from "./Country"
import City from "./City"
import User from "./User"

/*
|-----------------------------
|  Attack model
|-----------------------------
|
| 
*/
@Entity()
export default class Attack extends BaseEntity {

    /**
     * Keywords
     * 
     */
    @Column({ type: "simple-json", nullable: false })
    declare public keywords: string[]

    /**
     * Domains
     * 
     */
    @Column({ type: "simple-json", nullable: false })
    declare public domains: string[]

    /**
     * Domain action
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public domainAction: "CLICK" | "IGNORE"

    /**
     * Country
     * 
     */
    @ManyToOne(() => Country, country => country.attacks)
    declare public country: Country | null

    /**
     * City
     * 
     */
    @ManyToOne(() => City, city => city.attacks)
    declare public city: City | null

    /**
     * Device
     * 
     */
    @Column({ type: "varchar", nullable: true })
    declare public device: "DESKTOP" | "MOBILE" | null

    /**
     * Searches
     * 
     */
    @Column({ type: "int", nullable: false })
    declare public searches: number

    /**
     * Status
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public status: "CREATED" | "RUNNING" | "STOPPED"

    /**
     * User
     * 
     */
    @ManyToOne(() => User, user => user.attacks, { nullable: false })
    declare public user: User
}