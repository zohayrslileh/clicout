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
        for (const keyPlan in primitivePlans.value) {

            // Primitive plan
            const primitivePlan = primitivePlans.value[keyPlan]

            // Initialize plan
            const plan = new Plan

            // Set primitive plan
            Object.assign(plan, primitivePlan)

            // Save
            await plan.save()

            console.log("- Migration plan: ", plan.name, "Left: ", primitivePlans.value.length - +keyPlan)
        }
    }

    // Migration countries
    if (!await Country.count()) {

        // Primitive countries
        const primitiveCountries = new Json<unknown[]>("assets/database/countries.json")

        // Fetch primitive countries
        for (const keyCountry in primitiveCountries.value) {

            // Primitive country
            const primitiveCountry = primitiveCountries.value[keyCountry]

            // Initialize country
            const country = new Country

            // Set primitive country
            Object.assign(country, primitiveCountry)

            // Save
            await country.save()

            console.log("- Migration plan: ", country.name, "Left: ", primitiveCountries.value.length - +keyCountry)
        }
    }

    // Migration cities
    if (!await City.count()) {

        // Primitive cities
        const primitiveCities = new Json<unknown[]>("assets/database/cities.json")

        // Fetch primitive cities
        for (const keyCity in primitiveCities.value) {

            // Primitive city
            const primitiveCity = primitiveCities.value[keyCity]

            // Initialize city
            const city = new City

            // Set primitive country
            Object.assign(city, primitiveCity)

            // Set country
            city.country = await Country.findOneByOrFail({ code: String(city.country) })

            // Save
            await city.save()

            console.log("- Migration plan: ", city.name, "Left: ", primitiveCities.value.length - +keyCity)
        }
    }
}