import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"
import single from "./single"

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

    /**
     * Running
     * 
     */
    attack.get("/running", async function (context) {

        return context.json(await context.var.user.runningAttacks())
    })

    /**
     * Single
     * 
     */
    attack.route("/:id", single)
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