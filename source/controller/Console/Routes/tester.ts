import Json from "@/Tools/Json"
import axios from "axios"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const file = new Json("storage/suggestions.json")

    const suggestions: Suggestion[] = []

    for (const alphabet of alphabets) {

        const response = await axios({
            url: `https://www.teepublic.com/search/autocomplete?prefix=${alphabet}&limit=200`,
            headers: {
                "Accept": "application/json"
            }
        })

        suggestions.push(response.data.suggestions)

        console.log("- Fetch: ", alphabet)
    }

    file.update(suggestions)

    console.log("The test completed successfully 🧪 ")
}

/**
 * Alphabets
 *
 */
const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

/**
 * Suggestion
 * 
 */
interface Suggestion {
    suggestion: string
    weight: number
}