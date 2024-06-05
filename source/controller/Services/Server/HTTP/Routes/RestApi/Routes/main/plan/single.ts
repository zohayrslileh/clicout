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
        context.set("plan", await Plan.findOne(context.req.param("id")))

        return await next()
    })

    /**
     * Subscribe
     * 
     */
    plan.post("/subscribe/:paymentMethod", async function (context) {

        // Payment method
        const paymentMethod = context.req.param("paymentMethod")

        return context.json(await context.var.user.subscribe(context.var.plan, paymentMethod))
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