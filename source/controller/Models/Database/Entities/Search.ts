import BaseEntity from "@/Tools/Database/Entity"
import { Entity, ManyToOne } from "typeorm"
import Attack from "./Attack"

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
     * Attack
     * 
     */
    @ManyToOne(() => Attack, attack => attack.searches, { nullable: false })
    declare public attack: Attack
}