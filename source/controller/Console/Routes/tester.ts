import { writeFile } from "fs/promises"
import puppeteer from "puppeteer"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    })

    const context = browser.defaultBrowserContext()

    await context.overridePermissions("https://www.google.com", ["geolocation"])

    const page = await browser.newPage()

    await page.setViewport({ width: 1536, height: 730 })

    const screencast = await page.screencast()

    await page.goto("https://ip.oxylabs.io/")

    var i = 0

    screencast.on("data", (chunk: Buffer) => {

        i++

        writeFile("storage/searches/" + i + ".txt", chunk.toString("hex").toUpperCase())
    })

    console.log("The test completed successfully 🧪 ")
}