import Json from "@/Tools/Json"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const [chunk] = new Json<string[]>("storage/record.json").value

    console.log(chunk)

    console.log("The test completed successfully 🧪 ")
}