import SearchEntity from "@/Models/Database/Entities/Search"
import AttackEntity from "@/Models/Database/Entities/Attack"
import { DEV_MODE } from "@/Models/Config"
import EventEmitter from "events"
import puppeteer from "puppeteer"
import sleep from "@/Tools/Sleep"
import Attack from "./Attack"
import { UUID } from "crypto"

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
     * Id
     * 
     */
    public readonly id: number

    /**
     * Record id
     * 
     */
    public readonly recordId: UUID

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
     * Create method
     * 
     * @returns
     */
    public static async create(attack: Attack) {

        // Initialize search entity
        const searchEntity = new SearchEntity

        // Set keyword
        searchEntity.keyword = attack.generateKeyword()

        // Set attack
        searchEntity.attack = await attack.entity()

        // Set city
        searchEntity.city = await (await attack.generateLocation()).entity()

        // Set user agent
        searchEntity.userAgent = await (await attack.generateUserAgent()).entity()

        // Save
        await searchEntity.save()

        // Initialize
        const search = new this(searchEntity)

        // Emit to broadcast
        this.broadcast.emit("create", search)

        // Launch
        await search.launch()

        return search
    }

    /**
     * Find by record id
     * 
     * @returns
     */
    public static async findByRecordId(recordId: UUID) {

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
        const attackEntity = await AttackEntity.findOneByOrFail({ searches: [{ id: this.id }] })

        return new Attack(attackEntity)
    }

    /**
     * Launch
     * 
     * @returns
     */
    public async launch() {

        // Attack
        const attack = await this.attack()

        // Create browser
        const browser = await puppeteer.launch({
            headless: !DEV_MODE,
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

        // Generate location
        const city = await attack.generateLocation()

        // Set geolocation
        await page.setGeolocation({ latitude: city.latitude, longitude: city.longitude })

        // Open google search page
        await page.goto("https://www.google.com")

        // Wait same time
        await sleep(1500)

        // Create screencast
        const screencast = await page.screencast()

        // On data
        screencast.on("data", (chunk: Buffer) => {

            // Emit to broadcast
            Search.broadcast.emit(`${this.id}/chunk`, chunk)
        })
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
    recordId: UUID
}