import tester from "@/Console/Routes/tester"
import Router from "@/Tools/Socket/Router"

/*
|-----------------------------
| Main
|-----------------------------
|
*/
export default new Router(async function (_) {

    // Tester
    await tester()
})