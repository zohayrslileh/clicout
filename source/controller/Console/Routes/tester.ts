import Json from "@/Tools/Json"
import sleep from "@/Tools/Sleep"
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
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    })

    const context = browser.defaultBrowserContext()

    await context.overridePermissions("https://www.google.com", ["geolocation"])

    const page = await browser.newPage()

    page.setDefaultTimeout(0)

    await page.setUserAgent("com.google.GoogleMobile/111.0 iPhone/13.5.1 hw/iPhone10_3")

    await page.setViewport({ width: 375, height: 812 })

    await page.setGeolocation({ latitude: -13.067464, longitude: -55.930092 })

    const screencast = await page.screencast({ path: "storage/record.webm" })

    const chunks: Buffer[] = []

    screencast.on("data", (chunk: Buffer) => chunks.push(chunk))

    await page.goto("https://www.google.com/search?q=apple")

    await sleep(1000)

    await page.goto("https://www.google.com/")

    const textarea = await page.$("textarea")

    if (!textarea) throw new Error

    await sleep(2000)

    await textarea.focus()

    await textarea.type("Free vps")

    await textarea.press("Enter")

    await sleep(3000)

    await page.goto("https://whatismyipaddress.com/ip-lookup")

    await sleep(3000)

    await screencast.stop()

    await browser.close()

    new Json<Buffer[]>("storage/record.json").update(chunks)

    console.log("The test completed successfully 🧪 ")
}