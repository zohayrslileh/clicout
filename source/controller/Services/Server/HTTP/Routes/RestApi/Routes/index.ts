import Router from "@/Tools/HTTP/Router"
import welcome from "./welcome"
import auth from "./auth"
import main from "./main"

/*
|-----------------------------
|  Routes
|-----------------------------
|
|
*/
export default Router.create(function (routes) {

    /**
     * Options
     * 
     */
    routes.options("/*", context => context.body("Success"))

    /**
     * Welcome
     * 
     */
    routes.all("/", welcome)

    /**
     * Auth
     * 
     */
    routes.route("/auth", auth)

    /**
     * Main
     * 
     */
    routes.route("/main", main)
})