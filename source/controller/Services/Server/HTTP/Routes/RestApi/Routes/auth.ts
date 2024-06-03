import Router from "@/Tools/HTTP/Router"

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
    auth.post("/login", async function () {
    })

})

/**
 * Environment
 * 
 */
interface Environment {

    // Variables
    Variables: {
    }
}