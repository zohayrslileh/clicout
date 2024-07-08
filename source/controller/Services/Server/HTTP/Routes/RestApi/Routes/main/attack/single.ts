import Router from "@/Tools/HTTP/Router"
import Attack from "@/Core/Attack"
import User from "@/Core/User"

/*
|-----------------------------
|  Attack
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (attack) {

    /**
     * Middleware
     * 
     */
    attack.use(async function (context, next) {

        // Set attack variable
        context.set("attack", await context.var.user.findAttack(+context.req.param("id")!))

        return await next()
    })

    /**
     * Find
     * 
     */
    attack.get("/", async context => context.json(context.var.attack))

    /**
     * Stop
     * 
     */
    attack.post("/stop", async function (context) {

        // Stop
        await context.var.attack.stop()

        return context.body("")
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
        attack: Attack
    }
}