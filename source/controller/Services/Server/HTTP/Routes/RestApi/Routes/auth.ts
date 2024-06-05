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
     * Find
     * 
     */
    auth.get("/", async function (context) {

        try {

            // Get authorization
            const authorization = context.req.header("Authorization")

            // Authentication
            return context.json(await User.authentication(authorization))
        }

        catch {

            return context.json(undefined)
        }
    })

    /**
     * Login
     * 
     */
    auth.post("/login", async function (context) {

        // Login
        const user = await User.login(await context.req.json())

        return context.json(user.createAuthorization())
    })

    /**
     * Register
     * 
     */
    auth.post("/register", async function (context) {

        // Create user
        const user = await User.create(await context.req.json())

        return context.json([user, user.createAuthorization()])
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
    }
}