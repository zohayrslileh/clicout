import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"
import Plan from "@/Core/Plan"

/*
|-----------------------------
|  Plan
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (plan) {

    /**
     * Middleware
     * 
     */
    plan.use(async function (context, next) {

        // Set plan variable
        context.set("plan", await Plan.findOne(+context.req.param("id")!))

        return await next()
    })

    /**
     * Subscribe
     * 
     */
    plan.post("/subscribe", async function (context) {

        return context.json(await context.var.user.subscribe(context.var.plan, await context.req.json()))
    })
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
        plan: Plan
    }
}