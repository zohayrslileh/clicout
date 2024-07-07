import UAParser from "ua-parser-js"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const device = new UAParser("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1")

    console.log(device.getResult())

    console.log("The test completed successfully 🧪 ")
}