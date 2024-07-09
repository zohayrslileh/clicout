import AttackEntity from "@/Models/Database/Entities/Attack"
import Country, { PrimitiveCountry } from "./Country"
import City, { PrimitiveCity } from "./City"
import UserAgent from "./UserAgent"
import { randomUUID } from "crypto"
import sleep from "@/Tools/Sleep"
import puppeteer from "puppeteer"

/*
|-----------------------------
|  Attack
|-----------------------------
|
| 
*/
export default class Attack {

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Keywords
     * 
     */
    public readonly keywords: string[]

    /**
     * Country
     * 
     */
    public readonly country: Country | undefined

    /**
     * City
     * 
     */
    public readonly city: City | undefined

    /**
     * Device
     * 
     */
    public readonly device: string | undefined

    /**
     * Searches
     * 
     */
    public readonly searches: number

    /**
     * Constructor methodd
     * 
     */
    public constructor(primitiveAttack: PrimitiveAttack) {

        // Set id
        this.id = primitiveAttack.id

        // Set keywords
        this.keywords = primitiveAttack.keywords

        // Set country
        this.country = primitiveAttack.country ? new Country(primitiveAttack.country) : undefined

        // Set city
        this.city = primitiveAttack.city ? new City(primitiveAttack.city) : undefined

        // Set device
        this.device = primitiveAttack.device || undefined

        // Set searches
        this.searches = primitiveAttack.searches
    }

    /**
     * Generate location method
     * 
     * @returns
     */
    private async generateLocation() {

        return this.city || (this.country ? await this.country.randomCity() : await (await Country.random()).randomCity())
    }

    /**
     * Generate user agent method
     * 
     * @returns
     */
    private async generateUserAgent() {

        return await UserAgent.random(this.device)
    }

    /**
     * Start method
     * 
     * @returns
     */
    private async start() {

        // Create browser
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        })

        // Create context
        const context = browser.defaultBrowserContext()

        // Set geolocation permissions 
        await context.overridePermissions("https://www.google.com", ["geolocation"])

        // Create new page
        const page = await browser.newPage()

        // Disable timeout
        page.setDefaultTimeout(0)

        // Generate user agent
        const userAgent = await this.generateUserAgent()

        // Set user agent
        await page.setUserAgent(userAgent.getUA())

        // Set view port
        await page.setViewport({ width: userAgent.width, height: userAgent.height })

        // Generate location
        const city = await this.generateLocation()

        // Set geolocation
        await page.setGeolocation({ latitude: city.latitude, longitude: city.longitude })

        // Create recorder
        const recorder = await page.screencast({ path: `storage/records/${randomUUID()}.webm` })

        // On data
        recorder.on("data", _ => undefined)

        await page.goto("https://www.google.com/search?q=apple")

        await sleep(1000)

        await page.goto("https://www.google.com/")
    }

    /**
     * Safe start method
     * 
     * @returns
     */
    public safeStart() {

        this.start().catch(_ => console.log(_))
    }

    /**
     * Stop method
     * 
     * @returns
     */
    public async stop() {

        // Ettack entity
        const attackEntity = await AttackEntity.findOneByOrFail({ id: this.id })

        // Set status
        attackEntity.status = "STOPPED"

        // Save
        await attackEntity.save()
    }
}

/*
|-----------------------------
|  Primitive Attack
|-----------------------------
|
| 
*/
export interface PrimitiveAttack {
    id: number
    keywords: string[]
    country: PrimitiveCountry | null
    city: PrimitiveCity | null
    device: string | null
    searches: number
}