import Country from "@/Models/Database/Entities/Country"
import City from "@/Models/Database/Entities/City"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const countries = await Country.find()

    console.log(countries.length)

    const cities = await City.find()

    console.log(cities.length)

    console.log("The test completed successfully 🧪 ")
}