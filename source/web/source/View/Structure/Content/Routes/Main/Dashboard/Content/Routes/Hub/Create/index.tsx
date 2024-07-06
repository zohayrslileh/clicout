import { CiFlag1, CiLocationOn } from "react-icons/ci"
import { HiOutlineExternalLink } from "react-icons/hi"
import TagsInput from "@/View/Components/TagsInput"
import { useCallback, useState } from "react"
import { Checkbox } from "@nextui-org/react"
import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import Country from "@/Core/Country"
import Countries from "./Countries"
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
     * Domains Action
     * 
     */
    const [domainsAction, setDomainsAction] = useState<"IGNORE" | "CLICK">("IGNORE")

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

    /**
     * Keyword validation method
     * 
     * @returns 
     */
    const keywordValidation = useCallback(function (_: string, keywords: string[]) {

        if (keywords.length >= 20) return false

        return true

    }, [])

    /**
     * Domain validation method
     * 
     * @returns 
     */
    const domainValidation = useCallback(function (domain: string, domains: string[]) {

        if (domains.length >= 20) return false

        if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domain)) return false

        return true

    }, [])

    return <Card className="grid smooth gap-5 p-5 max-w-[700px] w-full h-fit mx-auto text-sm bg-content1">

        <h1 className="text-xl font-medium text-foreground-500 uppercase"><Lang>Create New Attack</Lang></h1>

        <div className="grid gap-3">
            <p className="text-foreground-500 flex items-center gap-1"><CiFlag1 /><Lang>Target</Lang></p>
            <TagsInput label={`${keywords.length} / 20`} beforeAddValidate={keywordValidation} value={keywords} onChange={setKeywords} placeHolder="Search Keywords..." />
            <TagsInput label={`${domains.length} / 20`} beforeAddValidate={domainValidation} value={domains} onChange={setDomains} placeHolder="Domains... (Optional)" />
            <div className="grid grid-cols-2 gap-5">
                <Checkbox size="sm" isSelected={domainsAction === "IGNORE"} onValueChange={isSelected => isSelected && setDomainsAction("IGNORE")} value="ignore"><Lang>Ignore this domains</Lang></Checkbox>
                <Checkbox size="sm" isSelected={domainsAction === "CLICK"} onValueChange={isSelected => isSelected && setDomainsAction("CLICK")} value="click"><Lang>Click this domains</Lang></Checkbox>
            </div>
        </div>

        <div className="grid gap-3">
            <p className="text-foreground-500 flex items-center gap-1"><CiLocationOn /><Lang>Location</Lang></p>
            <Countries value={country} onChange={setCountry} />
            {country && <Cities country={country} value={city} onChange={setCity} />}
            {country && city && <p className="justify-self-end">{city.name}, {country.name} check it in <a href={`https://www.google.com/maps/@${city.latitude},${city.longitude},11.43z`} target="_blank" className="text-primary inline-flex gap-1 items-center">Google Maps <HiOutlineExternalLink /></a></p>}
        </div>

    </Card>
}