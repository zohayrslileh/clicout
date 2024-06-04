import { existsSync, readFileSync, writeFileSync } from "fs"
import updater, { Reference, Updater } from "./Updater"
import format from "./Format"

/*
|-----------------------------
|  Json
|-----------------------------
|
|
*/
export default class Json<Template extends object> {

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
    public constructor(path: string, initialValue?: Template) {

        // Set path
        this.path = path

        // Set reference
        this.reference = { current: initialValue ? format(initialValue, this.parse()) : this.parse() }

        // Set update
        this.update = updater(this.reference, value => this.value = value)

    }

    /**
     * Get value
     * 
     * @returns
     */
    public get value(): Template {

        return format(this.reference.current, this.parse())
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
        writeFileSync(this.path, JSON.stringify(this.reference.current, undefined, 4))
    }

    /**
     * Parse method
     * 
     * @returns
     */
    private parse(): any {

        // Check file exists 
        if (!existsSync(this.path)) throw new Error("This file was not found")

        // Get result from storage
        const result = readFileSync(this.path, { encoding: "utf-8" })

        return JSON.parse(result || "{}")
    }
}