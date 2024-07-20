import { Column, Entity, ManyToOne } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Search from "./Search"

/*
|-----------------------------
|  SearchLog model
|-----------------------------
|
| 
*/
@Entity()
export default class SearchLog extends BaseEntity {

    /**
     * Title
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public title: string

    /**
     * Search
     * 
     */
    @ManyToOne(() => Search, search => search.logs, { nullable: false })
    declare public search: Search
}