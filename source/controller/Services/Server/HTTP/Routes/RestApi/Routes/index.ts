import Router from "@/Tools/HTTP/Router"
import welcome from "./welcome"

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
})