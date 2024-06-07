import Router from "@/Tools/HTTP/Router"
import Country from "@/Core/Country"
import User from "@/Core/User"

/*
|-----------------------------
|  Country
|-----------------------------
|
|
*/
export default Router.create<Environment>(function (country) {

    /**
     * Middleware
     * 
     */
    country.use(async function (context, next) {

        // Set country variable
        context.set("country", await Country.findOne(+context.req.param("id")!))

        return await next()
    })

    /**
     * Cities
     * 
     */
    country.get("/cities", async context => context.json(await context.var.country.cities()))
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
        country: Country
    }
}