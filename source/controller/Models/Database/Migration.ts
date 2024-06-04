import Plan from "./Entities/Plan"
import Json from "@/Tools/Json"

/*
|-----------------------------
|  Migration
|-----------------------------
|
|
*/
export default async function () {

    // Primitive plans
    const primitivePlans = new Json<unknown[]>("assets/database/plans.json")

    // Fetch primitive plans
    for (const primitivePlan of primitivePlans.value) {

        // Initialize plan
        const plan = new Plan

        // Set primitive plan
        Object.assign(plan, primitivePlan)

        // Check if is exists
        if (await Plan.findOneBy({ name: plan.name })) continue

        // Save
        await plan.save()
    }
}