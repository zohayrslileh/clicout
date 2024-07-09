import Broadcast from "@/Core/Broadcast"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    Broadcast.on("message", function (message: string) {

        console.log(message)

    })

    Broadcast.emit("message", "Hello World")

    console.log("The test completed successfully 🧪 ")
}