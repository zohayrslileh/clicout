import { ViewEntity } from "typeorm"
import Attack from "./Attack"

/*
|-----------------------------
|  Attack view
|-----------------------------
|
| 
*/
@ViewEntity({
    expression: `SELECT * FROM attack AS Attack`
})
export default class AttackView extends Attack {
}