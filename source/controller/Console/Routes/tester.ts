import Json from "@/Tools/Json"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const cities = new Json<City[]>("assets/database/cities.json")
    const countries = new Json<Country[]>("assets/database/countries.json")

    cities.value = cities.value

    console.log(countries.value.length)

    console.log("The test completed successfully 🧪 ")
}

interface City {
    id: string
    name: string
    country: string
    admin1: string
    lat: string
    lon: string
    pop: string
}

interface Country {
    name: string
    code: string
}