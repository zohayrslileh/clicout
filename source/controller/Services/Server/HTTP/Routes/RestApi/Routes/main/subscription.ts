import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"

/*
|-----------------------------
|  Subscription
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (subscription) {

    /**
     * Current
     * 
     */
    subscription.get("/current", async context => context.json(await context.var.user.subscription()))
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