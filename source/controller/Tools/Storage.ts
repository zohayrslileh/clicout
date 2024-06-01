import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import updater, { Reference, Updater } from "./Updater"
import { dirname } from "path"
import format from "./Format"

/*
|-----------------------------
|  Storage
|-----------------------------
|
|
*/
export default class Storage<Template> {

    /**
     * Reference
     * 
     */
    private readonly reference: Reference<Template>

    /**
     * Update
     * 
     */
    public readonly update: Updater<Template>

    /**
     * Path
     * 
     */
    private readonly path: string

    /**
     * Constructor method
     * 
     */
    public constructor(path: string, initialValue: Template) {

        // Set path
        this.path = path

        // Set reference
        this.reference = format({ current: initialValue }, this.parse())

        // Set update
        this.update = updater(this.reference, value => this.value = value)

    }

    /**
     * Get value
     * 
     * @returns
     */
    public get value(): Template {

        // Format referance
        const referance = format(this.reference, this.parse())

        return referance.current
    }

    /**
     * Set value
     * 
     * @returns
     */
    public set value(value: Template) {

        // Set value
        this.reference.current = value

        // Save in storage
        writeFileSync(this.path, JSON.stringify(this.reference))
    }

    /**
     * Parse method
     * 
     * @returns
     */
    private parse(): unknown {

        // Check file exists 
        if (!existsSync(this.path)) this.create()

        // Get result from storage
        const result = readFileSync(this.path, { encoding: "utf-8" })

        return JSON.parse(result || "{}")
    }

    /**
     * Create method
     * 
     * @returns
     */
    private create(): void {

        // Check file if not exist
        if (!existsSync(this.path)) {

            // Make dir
            mkdirSync(dirname(this.path), { recursive: true })

            // Make json file
            writeFileSync(this.path, "{}")
        }
    }

}