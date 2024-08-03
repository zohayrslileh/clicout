import { Column, Entity, ManyToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Search from "./Search"

/*
|-----------------------------
|  Click model
|-----------------------------
|
| 
*/
@Entity()
export default class Click extends BaseEntity {

    /**
     * Url
     * 
     */
    @Column({ type: "text", nullable: false })
    declare public url: string

    /**
     * GCLID
     * 
     */
    @Column({ type: "text", nullable: false })
    declare public gclid: string

    /**
     * Search
     * 
     */
    @ManyToOne(() => Search, search => search.logs, { nullable: false })
    declare public search: Search
}