import tester from "@/Console/Routes/tester"
import Router from "@/Tools/Socket/Router"
import Watch from "@/Core/Watch"

/*
|-----------------------------
| Main
|-----------------------------
|
*/
export default new Router(async function (main) {

    // Set namespace
    Watch.broadcast = main.namespace

    // Tester
    await tester()
})