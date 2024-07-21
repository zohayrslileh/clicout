import SearchEntity from "@/Models/Database/Entities/Search"
import AttackEntity from "@/Models/Database/Entities/Attack"
import SearchLog from "./SearchLog"
import EventEmitter from "events"
import puppeteer from "puppeteer"
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
     * Constructor method
     * 
     */
    public constructor(primitiveSearch: PrimitiveSearch) {

        // Set id
        this.id = primitiveSearch.id

        // Set record id
        this.recordId = primitiveSearch.recordId
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

        // CREATE LOG
        await this.createLog("Prepare device")

        // Attack
        const attack = await this.attack()

        // Create browser
        const browser = await puppeteer.launch({
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
        const page = await browser.newPage()

        // Disable timeout
        page.setDefaultTimeout(0)

        // Generate user agent
        const userAgent = await attack.generateUserAgent()

        // Set user agent
        await page.setUserAgent(userAgent.getUA())

        // Set view port
        await page.setViewport({ width: userAgent.width, height: userAgent.height })

        // CREATE LOG
        await this.createLog("Prepare location")

        // Generate location
        const city = await attack.generateLocation()

        // Set geolocation
        await page.setGeolocation({ latitude: city.latitude, longitude: city.longitude })

        // Go to sample search page
        await page.goto("https://www.google.com/search?q=apple")

        // Wait same time
        await sleep(3000)

        // Go to google
        await page.goto("https://www.google.com/")

        // Wait same time
        await sleep(1000)

        // Create screencast
        const screencast = await page.screencast()

        // Chunks
        const chunks: Buffer[] = Search.recordsChunks[this.id] = []

        // On data
        screencast.on("data", (chunk: Buffer) => {

            // Set to chunks
            chunks.push(chunk)

            // Emit to broadcast
            Search.broadcast.emit(`${this.id}/chunk`, chunk)
        })

        // CREATE LOG
        await this.createLog("Start search")

        // Go to timeanddate
        await page.goto("https://24timezones.com/Morocco/time")

        // Wait same time
        await sleep(10 * 1000)

        // Stop screencast
        await screencast.stop()

        // Close page
        await page.close()

        // Close browser
        await browser.close()

        // Done
        await this.done()
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
}