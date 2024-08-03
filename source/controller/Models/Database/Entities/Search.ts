import { Column, Entity, Generated, ManyToOne, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import SearchLog from "./SearchLog"
import UserAgent from "./UserAgent"
import Attack from "./Attack"
import Click from "./Click"
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
    @ManyToOne(() => City, city => city.searchs, { nullable: false, eager: true })
    declare public city: City

    /**
     * User agent
     * 
     */
    @ManyToOne(() => UserAgent, userAgent => userAgent.searchs, { nullable: false, eager: true })
    declare public userAgent: UserAgent

    /**
     * Record id
     * 
     */
    @Column({ type: "uuid", unique: true, nullable: false })
    @Generated("uuid")
    declare public readonly recordId: string

    /**
     * Logs
     * 
     */
    @OneToMany(() => SearchLog, searchLog => searchLog.search)
    declare public logs: SearchLog[]

    /**
     * Clicks
     * 
     */
    @OneToMany(() => Click, click => click.search)
    declare public clicks: Click[]
}