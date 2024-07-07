import Router from "@/Tools/HTTP/Router"
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
     * Create
     * 
     */
    attack.post("/", async function (context) {

        // Data
        const data = await context.req.json()

        return context.json(await context.var.user.createAttack(data))
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
    }
}