import tester from "@/Console/Routes/tester"
import Router from "@/Tools/Socket/Router"
import Screen from "@/Core/Screen"

/*
|-----------------------------
| Main
|-----------------------------
|
*/
export default new Router(async function (main) {

    // Set screen brodcast
    Screen.brodcast = main.namespace

    // Tester
    await tester()
})