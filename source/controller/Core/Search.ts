import puppeteer, { Browser, Page, ScreenRecorder } from "puppeteer"
import SearchEntity from "@/Models/Database/Entities/Search"
import AttackEntity from "@/Models/Database/Entities/Attack"
import UserAgent, { PrimitiveUserAgent } from "./UserAgent"
import City, { PrimitiveCity } from "./City"
import SearchLog from "./SearchLog"
import EventEmitter from "events"
import sleep from "@/Tools/Sleep"
import Attack from "./Attack"

/*
|-----------------------------
|  Search
|-----------------------------
|
| 
*/
export default class Search {

    /**
     * Broadcast
     * 
     */
    public static readonly broadcast = new EventEmitter

    /**
     * Records chunks
     * 
     */
    public static readonly recordsChunks: Record<number, Buffer[] | undefined> = {}

    /**
     * Id
     * 
     */
    public readonly id: number

    /**
     * Record id
     * 
     */
    public readonly recordId: string

    /**
     * Keyword
     * 
     */
    public readonly keyword: string

    /**
     * City
     * 
     */
    public readonly city: City

    /**
     * User agent
     * 
     */
    public readonly userAgent: UserAgent

    /**
     * Constructor method
     * 
     */
    public constructor(primitiveSearch: PrimitiveSearch) {

        // Set id
        this.id = primitiveSearch.id

        // Set record id
        this.recordId = primitiveSearch.recordId

        // Set keyword
        this.keyword = primitiveSearch.keyword

        // Set city
        this.city = new City(primitiveSearch.city)

        // Set user agent
        this.userAgent = new UserAgent(primitiveSearch.userAgent)
    }

    /**
     * Entity
     * 
     * @returns
     */
    public async entity() {

        return await SearchEntity.findOneByOrFail({ id: this.id })
    }

    /**
     * Create method
     * 
     * @returns
     */
    public static async create(attack: Attack) {

        // Generate city
        const city = await attack.generateLocation()

        // Generate user agent
        const userAgent = await attack.generateUserAgent()

        // Initialize search entity
        const searchEntity = new SearchEntity

        // Set keyword
        searchEntity.keyword = attack.generateKeyword()

        // Set attack
        searchEntity.attack = await attack.entity()

        // Set city
        searchEntity.city = await city.entity()

        // Set user agent
        searchEntity.userAgent = await userAgent.entity()

        // Save
        await searchEntity.save()

        // Initialize
        const search = new this(searchEntity)

        // Emit to broadcast
        this.broadcast.emit("create", search)

        return search
    }

    /**
     * Find by record id method
     * 
     * @returns
     */
    public static async findByRecordId(recordId: string) {

        // Initialize search entity
        const searchEntity = await SearchEntity.findOneByOrFail({ recordId })

        // Initialize search
        return new this(searchEntity)
    }

    /**
     * Attack
     * 
     * @returns
     */
    public async attack() {

        // Attack entity
        const attackEntity = await AttackEntity.findOneOrFail({
            where: { searches: [{ id: this.id }] },
            relations: { country: true, city: true }
        })

        return new Attack(attackEntity)
    }

    /**
     * Launch
     * 
     * @returns
     */
    public async launch() {

        // Create browser
        var browser: Browser | undefined

        // Create page
        var page: Page | undefined

        // Create screencast
        var screencast: ScreenRecorder | undefined

        // Create chunks
        var chunks: Buffer[] = Search.recordsChunks[this.id] = []

        // Try launch
        try {

            // CREATE LOG
            await this.createLog("Prepare device")

            // Create browser
            browser = await puppeteer.launch({
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox"
                ]
            })

            // Create context
            const context = browser.defaultBrowserContext()

            // Set geolocation permissions 
            await context.overridePermissions("https://www.google.com", ["geolocation"])

            // Create new page
            page = await browser.newPage()

            // Disable timeout
            page.setDefaultTimeout(0)

            // Set user agent
            await page.setUserAgent(this.userAgent.getUA())

            // Set view port
            await page.setViewport({ width: this.userAgent.width, height: this.userAgent.height })

            // CREATE LOG
            await this.createLog("Prepare location")

            // Set geolocation
            await page.setGeolocation({ latitude: this.city.latitude, longitude: this.city.longitude })

            // Go to sample search page
            await page.goto("https://www.google.com/search?q=apple")

            // Wait same time
            await sleep(1000)

            // Accepte cookies privacy button
            const GOOGLE_COOKIES_PRIVACY_ACCEPTE_BUTTON = await page.$(process.env.GOOGLE_COOKIES_PRIVACY_ACCEPTE_BUTTON_SELECTOR!)

            // Accepte cookies privacy
            if (GOOGLE_COOKIES_PRIVACY_ACCEPTE_BUTTON) await GOOGLE_COOKIES_PRIVACY_ACCEPTE_BUTTON.click()

            // Wait same time
            await sleep(2000)

            // Go to google
            await page.goto("https://www.google.com/")

            // Wait same time
            await sleep(1000)

            // Create screencast
            screencast = await page.screencast()

            // On data
            screencast.on("data", (chunk: Buffer) => {

                // Set to chunks
                chunks.push(chunk)

                // Emit to broadcast
                Search.broadcast.emit(`${this.id}/chunk`, chunk)
            })

            // CREATE LOG
            await this.createLog("Start search")

            // Wait same time
            await sleep(3000)

            // Search zone
            const SEARCH_ZONE = await page.$("textarea")

            // Check search zone
            if (!SEARCH_ZONE) throw new Error

            // Type search keyword
            await SEARCH_ZONE.type(this.keyword)

            // Wait same time
            await sleep(2000)

            // Press enter
            await SEARCH_ZONE.press("Enter")

            // Wait same time
            await sleep(2000)

            // Wait same time
            await sleep(15 * 1000)
        }

        // On exception
        catch (exception) {

            // CREATE LOG
            await this.createLog("Unknown search error")
        }

        // Finally
        finally {

            // Done
            await this.done()

            // Stop screencast
            if (screencast) await screencast.stop()

            // Close page
            if (page) await page.close()

            // Close browser
            if (browser) await browser.close()
        }
    }

    /**
     * Recorded chunks
     * 
     * @returns
     */
    public recorderChunks() {

        return Search.recordsChunks[this.id] || []
    }

    /**
     * Create log method
     * 
     * @returns
     */
    public async createLog(title: string) {

        return await SearchLog.create(this, title)
    }

    /**
     * Done method
     * 
     * @returns
     */
    public async done() {

        // CREATE LOG
        await this.createLog("Done")

        // Emit to broadcast
        Search.broadcast.emit("done", this)

        // Emit to broadcast
        Search.broadcast.emit(`${this.id}/done`)

        // Remove records chunks
        Search.recordsChunks[this.id] = undefined
    }
}

/*
|-----------------------------
|  Primitive Search
|-----------------------------
|
| 
*/
export interface PrimitiveSearch {
    id: number
    recordId: string
    keyword: string
    city: PrimitiveCity
    userAgent: PrimitiveUserAgent
}