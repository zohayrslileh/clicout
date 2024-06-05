import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"
import plan from "./plan"

/*
|-----------------------------
|  Main
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (main) {

    /**
     * Middleware
     * 
     */
    main.use(async function (context, next) {

        // Get authorization
        const authorization = context.req.header("Authorization")

        // Set user variable
        context.set("user", await User.authentication(authorization))

        return await next()
    })

    /**
     * Subscription
     * 
     */
    main.get("/subscription", async function (context) {

        // Subscription
        const subscription = await context.var.user.subscription()

        return context.json(subscription)
    })

    /**
     * Plan
     * 
     */
    main.route("/plan", plan)
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