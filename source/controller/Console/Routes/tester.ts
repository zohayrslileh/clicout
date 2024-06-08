import Json from "@/Tools/Json"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const suggestions = new Json<Suggestion[]>("storage/suggestions.json")

    suggestions.update(suggestions => suggestions.filter(suggestion => suggestion.weight > 5000))

    console.log("The test completed successfully 🧪 ")
}

/**
 * Suggestion
 * 
 */
interface Suggestion {
    suggestion: string
    weight: number
}