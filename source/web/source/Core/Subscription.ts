import { PrimitivePlan } from "./Plan"

/*
|-----------------------------
|  Primitive Subscription
|-----------------------------
|
| 
*/
export interface PrimitiveSubscription {
    id: number
    expireAt: string
    plan: PrimitivePlan
}