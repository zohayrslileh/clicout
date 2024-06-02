import tester from "@/Console/Routes/tester"
import Router from "@/Tools/Socket/Router"

/*
|-----------------------------
| Main
|-----------------------------
|
|
*/
export default new Router(async function (main) {

    // On connection
    main.onConnection(async function (client) {

        await tester(client)
    })
})