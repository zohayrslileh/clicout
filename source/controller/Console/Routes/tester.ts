import City from "@/Models/Database/Entities/City"
import puppeteer from "puppeteer"

/*
|-----------------------------
|  Tester 🧪
|-----------------------------
|
|
*/
export default async function () {

    const cityQueryBuilder = City.createQueryBuilder("city").leftJoinAndSelect("city.country", "country")

    const city = await cityQueryBuilder.select().orderBy("RAND()").getOneOrFail()

    console.log(city.name, city.country.name)

    const browser = await puppeteer.launch({ headless: false })

    const context = browser.defaultBrowserContext()

    await context.overridePermissions("https://www.google.com", ["geolocation"])

    const page = await browser.newPage()

    page.setDefaultTimeout(0)

    await page.setUserAgent("com.google.GoogleMobile/111.0 iPhone/13.5.1 hw/iPhone10_3")

    await page.setViewport({ width: 375, height: 700 })

    await page.setGeolocation({ latitude: city.latitude, longitude: city.longitude })

    await page.goto("https://www.google.com/search?q=apple")

    await page.goto("https://www.google.com/")

    console.log("The test completed successfully 🧪 ")
}