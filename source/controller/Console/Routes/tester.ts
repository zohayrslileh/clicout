import Json from "@/Tools/Json"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const cities = new Json<unknown[]>("assets/database/cities500.json")

    console.log(cities.value.length)

    console.log("The test completed successfully 🧪 ")
}