import Router from "@/Tools/HTTP/Router"
import User from "@/Core/User"
import Plan from "@/Core/Plan"

/*
|-----------------------------
|  Main
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (main) {

    /**
     * Find
     * 
     */
    main.get("/", async context => context.json(await Plan.find()))
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