import UserAgent from "./Entities/UserAgent"
import Country from "./Entities/Country"
import UAParser from "ua-parser-js"
import Plan from "./Entities/Plan"
import City from "./Entities/City"
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

        // Countries
        const countries = await Country.find()

        // Fetch primitive cities
        for (const primitiveCity of primitiveCities.value) {

            // Initialize city
            const city = new City

            // Set primitive country
            Object.assign(city, primitiveCity)

            // Find country
            const country = countries.find(country => country.code === String(city.country))

            // Check country
            if (!country) continue

            // Set country
            city.country = country

            // Save
            await city.save()

            leftCities--

            console.log("- Migration city: ", city.name, "Left: " + leftCities)
        }
    }

    // Migration user agents
    if (!await UserAgent.count()) {

        // Primitive user agents
        const primitiveUserAgents = new Json<string[]>("assets/database/user_agents.json")

        // Fetch primitive user agents
        for (const primitiveUserAgent of primitiveUserAgents.value) {

            // User agent parser
            const userAgentParser = new UAParser(primitiveUserAgent)

            // Device
            const device = userAgentParser.getDevice()

            // Initialize user agent
            const userAgent = new UserAgent

            // Set value
            userAgent.value = primitiveUserAgent

            // Set device
            userAgent.device = device.type ? device.type.toUpperCase() : "DESKTOP"

            // Set width
            userAgent.width = userAgent.device === "DESKTOP" ? 1536 : 375

            // Set height
            userAgent.height = userAgent.device === "DESKTOP" ? 730 : 812

            // Save
            await userAgent.save()

            console.log("- Migration country: ", primitiveUserAgent)
        }
    }
}