import Router from "@/Tools/Console/Router"

/*
|-----------------------------
| Build
|-----------------------------
|
|
*/
export default Router.create(function (build) {

    build.index(() => require("./all"))
    build.route("web", () => require("./web"))
    build.route("controller", () => require("./controller"))
})