import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"

/*
|-----------------------------
|  Access
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