import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"

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
        context.set("user", await User.findByAuthorization(authorization))

        return await next()
    })

    /**
     * Initialize
     * 
     */
    main.get("/", async context => context.json(context.var.user))
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