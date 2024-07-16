import { ViewColumn, ViewEntity } from "typeorm"
import Attack from "./Attack"

/*
|-----------------------------
|  Attack view
|-----------------------------
|
| 
*/
@ViewEntity({
    expression: `
    SELECT
        Attack.*,
        COUNT(Search.id) AS searchesCount
    FROM attack AS Attack
        LEFT JOIN search AS Search ON Search.attackId = Attack.id
    GROUP BY Attack.id
    `
})
export default class AttackView extends Attack {

    /**
     * Searches count
     * 
     */
    @ViewColumn()
    declare public searchesCount: number
}