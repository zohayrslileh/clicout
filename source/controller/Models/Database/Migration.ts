import City from "./Entities/City"
import Country from "./Entities/Country"
import Plan from "./Entities/Plan"
import Json from "@/Tools/Json"

/*
|-----------------------------
|  Migration
|-----------------------------
|
|
*/
export default async function () {

    // Migration plans
    if (!await Plan.count()) {

        // Primitive plans
        const primitivePlans = new Json<unknown[]>("assets/database/plans.json")

        // Fetch primitive plans
        for (const primitivePlan of primitivePlans.value) {

            // Initialize plan
            const plan = new Plan

            // Set primitive plan
            Object.assign(plan, primitivePlan)

            // Save
            await plan.save()

            console.log("- Migration plan: ", plan.name)
        }
    }

    // Migration countries
    if (!await Country.count()) {

        // Primitive countries
        const primitiveCountries = new Json<unknown[]>("assets/database/countries.json")

        // Fetch primitive countries
        for (const primitiveCountry of primitiveCountries.value) {

            // Initialize country
            const country = new Country

            // Set primitive country
            Object.assign(country, primitiveCountry)

            // Save
            await country.save()

            console.log("- Migration country: ", country.name)
        }
    }

    // Migration cities
    if (!await City.count()) {

        // Primitive cities
        const primitiveCities = new Json<unknown[]>("assets/database/cities.json")

        // Left cities
        var leftCities = primitiveCities.value.length

        // Fetch primitive cities
        for (const primitiveCity of primitiveCities.value) {

            // Initialize city
            const city = new City

            // Set primitive country
            Object.assign(city, primitiveCity)

            // Set country
            city.country = await Country.findOneByOrFail({ code: String(city.country) })

            // Save
            await city.save()

            leftCities--

            console.log("- Migration city: ", city.name, "Left: " + leftCities)
        }
    }
}