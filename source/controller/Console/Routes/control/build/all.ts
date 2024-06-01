import controller from "./controller"
import web from "./web"

/*
|-----------------------------
| Build All
|-----------------------------
|
|
*/
export default async function () {

    await controller()

    await web()
}