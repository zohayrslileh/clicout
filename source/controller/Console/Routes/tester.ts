import List from "@/Tools/List"
import sleep from "@/Tools/Sleep";

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    do {

        console.log(keywords.next())

        await sleep(2000)

    } while (true)

    console.log("The test completed successfully 🧪 ");
}

const keywords = new List(["Hi", "Hello", "How are you"])