import { Column, Entity, OneToMany } from "typeorm"
import BaseEntity from "@/Tools/Database/Entity"
import Search from "./Search"

/*
|-----------------------------
|  UserAgent model
|-----------------------------
|
| 
*/
@Entity()
export default class UserAgent extends BaseEntity {

    /**
     * Value
     * 
     */
    @Column({ type: "text", nullable: false, unique: true })
    declare public value: string

    /**
     * Device
     * 
     */
    @Column({ type: "varchar", nullable: false })
    declare public device: string

    /**
     * Width
     * 
     */
    @Column({ type: "float", nullable: false })
    declare public width: number

    /**
     * Height
     * 
     */
    @Column({ type: "float", nullable: false })
    declare public height: number

    /**
     * Searchs
     * 
     */
    @OneToMany(() => Search, search => search.userAgent)
    declare public searchs: Search[]
}