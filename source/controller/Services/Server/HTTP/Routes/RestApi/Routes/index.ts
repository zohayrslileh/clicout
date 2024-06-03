import Router from "@/Tools/HTTP/Router"
import welcome from "./welcome"
import access from "./access"
import auth from "./auth"

/*
|-----------------------------
|  Routes
|-----------------------------
|
|
*/
export default Router.create(function (routes) {

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
     * Auth
     * 
     */
    routes.route("/access", access)
})