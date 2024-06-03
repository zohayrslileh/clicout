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
     * Login
     * 
     */
    auth.post("/login", async function (context) {

        // Get user
        const user = await User.findByAccessInfo(await context.req.json())

        return context.json(user.createAuthorization())
    })

    /**
     * Register
     * 
     */
    auth.post("/register", async function (context) {

        // Create user
        const user = await User.create(await context.req.json())

        return context.json(user)
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