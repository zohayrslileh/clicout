import { CiFlag1, CiLocationOn } from "react-icons/ci"
import TagsInput from "@/View/Components/TagsInput"
import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import Country from "@/Core/Country"
import Countries from "./Countries"
import { useState } from "react"
import City from "@/Core/City"
import Cities from "./Cities"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    /**
     * Keywords
     * 
     */
    const [keywords, setKeywords] = useState<string[]>([])

    /**
     * Domains
     * 
     */
    const [domains, setDomains] = useState<string[]>([])

    /**
     * Country
     * 
     */
    const [country, setCountry] = useState<Country | undefined>(undefined)

    /**
     * City
     * 
     */
    const [city, setCity] = useState<City | undefined>(undefined)

    return <Card className="grid smooth gap-5 p-5 max-w-[700px] w-full h-fit mx-auto text-sm bg-content1">

        <h1 className="text-xl font-medium text-foreground-500 uppercase"><Lang>Create New Attack</Lang></h1>

        <div className="grid gap-3">
            <p className="text-foreground-500 flex items-center gap-1"><CiFlag1 /><Lang>Target</Lang></p>
            <TagsInput value={keywords} onChange={setKeywords} placeHolder="Search Keywords..." />
            <TagsInput value={domains} onChange={setDomains} placeHolder="Domains... (Optional)" />
        </div>

        <div className="grid gap-3">
            <p className="text-foreground-500 flex items-center gap-1"><CiLocationOn /><Lang>Location</Lang></p>
            <Countries value={country} onChange={setCountry} />
            {country && <Cities country={country} value={city} onChange={setCity} />}
        </div>

    </Card>
}