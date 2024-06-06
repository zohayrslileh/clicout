import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"
import Plan from "@/Core/Plan"
import single from "./single"

/*
|-----------------------------
|  Plan
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (plan) {

    /**
     * Find
     * 
     */
    plan.get("/", async context => context.json(await Plan.find()))

    /**
     * Current
     * 
     */
    plan.get("/current", async context => context.json(await context.var.user.plan()))

    /**
     * Single
     * 
     */
    plan.route("/:id", single)
})

/*
|-----------------------------
|  Environment
|-----------------------------
|
|
*/
interface Environment {

    // Variables
    Variables: {
        user: User
    }
}