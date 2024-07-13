import { Column, Entity, ManyToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import UserAgent from "./UserAgent"
import Attack from "./Attack"
import City from "./City"

/*
|-----------------------------
|  Search model
|-----------------------------
|
| 
*/
@Entity()
export default class Search extends BaseEntity {

    /**
     * Keyword
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public keyword: string

    /**
     * Attack
     * 
     */
    @ManyToOne(() => Attack, attack => attack.searches, { nullable: false })
    declare public attack: Attack

    /**
     * City
     * 
     */
    @ManyToOne(() => City, city => city.searchs, { nullable: false })
    declare public city: City

    /**
     * User agent
     * 
     */
    @ManyToOne(() => UserAgent, userAgent => userAgent.searchs, { nullable: false })
    declare public userAgent: UserAgent
}