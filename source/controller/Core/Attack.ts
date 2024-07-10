import AttackEntity from "@/Models/Database/Entities/Attack"
import Country, { PrimitiveCountry } from "./Country"
import User, { PrimitiveUser } from "./User"
import City, { PrimitiveCity } from "./City"
import { DEV_MODE } from "@/Models/Config"
import UserAgent from "./UserAgent"
import { randomUUID } from "crypto"
import sleep from "@/Tools/Sleep"
import puppeteer from "puppeteer"
import EventEmitter from "events"

/*
|-----------------------------
|  Attack
|-----------------------------
|
| 
*/
export default class Attack {

    /**
     * Broadcast
     * 
     */
    public static readonly broadcast = new EventEmitter

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
     * User
     * 
     */
    public readonly user: User

    /**
     * Constructor method
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

        // Set user
        this.user = new User(primitiveAttack.user)
    }

    /**
     * Generate location method
     * 
     * @returns
     */
    private async generateLocation() {

        return this.city || (this.country ? await this.country.randomCity() : await City.random())
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
            headless: !DEV_MODE,
            args: [
                '--no-sandbox', // Disable sandboxing
                '--disable-setuid-sandbox', // Disable setuid sandbox
                '--disable-dev-shm-usage', // Use /tmp instead of /dev/shm
                '--disable-gpu', // Disable GPU hardware acceleration
                '--no-zygote', // Disable zygote process
                '--disable-extensions', // Disable all extensions
                '--disable-background-networking', // Disable some background networking tasks
                '--disable-background-timer-throttling', // Disable throttling of background timers
                '--disable-renderer-backgrounding', // Prevent putting tabs in background mode
                '--disable-device-discovery-notifications' // Disable device discovery notifications
            ]
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

        // Open google results page
        await page.goto("https://www.google.com/search?q=apple")

        // Wait same time
        await sleep(1500)

        // Open blank page
        await page.goto("about:blank")

        // Create screencast
        const screencast = await page.screencast({ path: `storage/records/${randomUUID()}.webm` })

        // On screencast chunk
        screencast.on("data", chunk => Attack.broadcast.emit("record-chunk", chunk, this))

        // Open google search page
        await page.goto("https://www.google.com/")

        // Wait same time
        await sleep(1500)

        do {

            // Open custom page
            await page.goto("https://www.w3schools.com/css/tryit.asp?filename=trycss3_animation_count2")

            // Wait same time
            await sleep(10000)

            // Open custom page
            await page.goto("https://www.w3schools.com/css/tryit.asp?filename=trycss3_animation_speed")

            // Wait same time
            await sleep(20000)

        } while (true)
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
    user: PrimitiveUser
}