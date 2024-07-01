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
        headless: false,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            // "--proxy-server=socks5://23.19.244.109:1080"
        ]
    })

    const context = browser.defaultBrowserContext()

    await context.overridePermissions("https://www.google.com", ["geolocation"])

    const page = await browser.newPage()

    page.setDefaultTimeout(0)

    await page.setUserAgent("com.google.GoogleMobile/111.0 iPhone/13.5.1 hw/iPhone10_3")

    await page.setViewport({ width: 375, height: 812 })

    await page.setGeolocation({ latitude: 28.6282547, longitude: 77.2202781 })

    const recorder = await page.screencast({ path: "storage/record.webm" })

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

    await page.goto("https://whatismyipaddress.com/")

    await sleep(3000)

    await recorder.stop()

    await browser.close()

    console.log("The test completed successfully 🧪 ")
}