import Json from "@/Tools/Json"
import axios from "axios"
import chalk from "chalk"

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

        do {

            try {
                var response = await axios<string>("https://www.teepublic.com/t-shirts?query=" + suggestion)
                break
            }
            catch {
                continue
            }
        } while (true)

        const regex = /href="\/t-shirts\?page=(\d+)/g

        const pageNumbers = []

        let match

        while ((match = regex.exec(response.data)) !== null) pageNumbers.push(parseInt(match[1], 10))

        suggestion.pages = Math.max(...pageNumbers)

        file.update(suggestions)

        console.log(suggestion.suggestion, suggestion.weight, chalk.bold.blue(suggestion.pages))
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