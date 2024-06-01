import Router from "@/Tools/Socket/Router"
import Watch from "@/Core/Watch"

/*
|-----------------------------
| Main
|-----------------------------
|
*/
export default new Router(function (main) {

    // Set namespace
    Watch.broadcast = main.namespace
})