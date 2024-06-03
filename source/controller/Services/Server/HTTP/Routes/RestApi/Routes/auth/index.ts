import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"

/*
|-----------------------------
|  Auth
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (auth) {

    /**
     * Middleware
     * 
     */
    auth.use(async function (context, next) {

        // Get authorization
        const authorization = context.req.header("Authorization")

        // Set user variable
        context.set("user", await User.findByAuthorization(authorization))

        return await next()
    })

    /**
     * Initialize
     * 
     */
    auth.get("/", async context => context.json(context.var.user))

})

/**
 * Environment
 * 
 */
interface Environment {

    // Variables
    Variables: {
        user: User
    }
}