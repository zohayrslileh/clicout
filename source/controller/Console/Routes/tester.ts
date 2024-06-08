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

    const file = new Json<Suggestion[]>("storage/suggestions.json")

    const suggestions = file.value

    for (const suggestion of suggestions) {

        const response = await axios<string>("https://www.teepublic.com/t-shirts?query=" + suggestion)

        const domParser = new DOMParser

        const dom = domParser.parseFromString(response.data, "text/html")

        console.log(dom)

        break
    }

    console.log("The test completed successfully 🧪 ")
}

/**
 * Suggestion
 * 
 */
interface Suggestion {
    suggestion: string
    pages: number
    weight: number
}