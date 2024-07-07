import subscription from "./subscription"
import Router from "@/Tools/HTTP/Router"
import country from "./country"
import User from "@/Core/User"
import attack from "./attack"
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
    main.route("/subscription", subscription)

    /**
     * Plan
     * 
     */
    main.route("/plan", plan)

    /**
     * Country
     * 
     */
    main.route("/country", country)

    /**
     * Attack
     * 
     */
    main.route("/attack", attack)
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