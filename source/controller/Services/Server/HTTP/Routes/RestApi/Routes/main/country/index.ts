import Router from "@/Tools/HTTP/Router"
import Country from "@/Core/Country"
import User from "@/Core/User"
import single from "./single"

/*
|-----------------------------
|  Country
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (country) {

    /**
     * Find
     * 
     */
    country.get("/", async context => context.json(await Country.find()))

    /**
     * Single
     * 
     */
    country.route("/:id", single)
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