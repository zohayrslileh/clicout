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
    country.get("/", async function (context) {

        // Query
        const query = context.req.query()

        return context.json(await Country.find(query.keyword))
    })

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