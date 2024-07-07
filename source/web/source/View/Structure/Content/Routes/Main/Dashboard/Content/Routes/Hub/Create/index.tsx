import { CiAlarmOn, CiFlag1, CiLocationOn } from "react-icons/ci"
import { HiOutlineExternalLink } from "react-icons/hi"
import { Button, Checkbox } from "@nextui-org/react"
import TagsInput from "@/View/Components/TagsInput"
import { IoRocketOutline } from "react-icons/io5"
import { PiDevicesThin } from "react-icons/pi"
import { useCallback, useState } from "react"
import Card from "@/View/Components/Card"
import { Link } from "react-router-dom"
import { Lang } from "@/Tools/Language"
import Country from "@/Core/Country"
import Countries from "./Countries"
import Searches from "./Searches"
import Devices from "./Devices"
import Plan from "@/Core/Plan"
import City from "@/Core/City"
import Cities from "./Cities"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    /**
     * Plan
     * 
     */
    const plan = Plan.useContext()

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
     * Device
     * 
     */
    const [device, setDevice] = useState<string>("ALL")

    /**
     * Searches
     * 
     */
    const [searches, setSearches] = useState<number>(1)

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

    return <Card className="grid smooth gap-6 p-5 mt-5 max-w-[700px] w-full h-fit mx-auto text-sm bg-background">

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
            <div className="text-foreground-500 flex justify-between">
                <p className="flex items-center gap-1"><CiLocationOn /><Lang>Location</Lang></p>
                {!plan.customizeLocation && <p><Link to="/main/upgrade" className="text-primary underline"><Lang>Upgrade</Lang></Link> <Lang>for customize location</Lang></p>}
            </div>
            <Countries isDisabled={!plan.customizeLocation} value={country} onChange={setCountry} />
            {country && <Cities isDisabled={!plan.customizeLocation} country={country} value={city} onChange={setCity} />}
            {country && city && <p className="justify-self-end">{city.name}, {country.name} check it in <a href={`https://www.google.com/maps/@${city.latitude},${city.longitude},15z`} target="_blank" className="text-primary inline-flex gap-1 items-center">Google Maps <HiOutlineExternalLink /></a></p>}
        </div>

        <div className="grid gap-3">
            <div className="text-foreground-500 flex justify-between">
                <p className="flex items-center gap-1"><PiDevicesThin /><Lang>Devices</Lang></p>
                {!plan.customizeDevices && <p><Link to="/main/upgrade" className="text-primary underline"><Lang>Upgrade</Lang></Link> <Lang>for customize devices</Lang></p>}
            </div>
            <Devices isDisabled={!plan.customizeDevices} value={device} onChange={setDevice} />
        </div>

        <div className="grid gap-3">
            <p className="text-foreground-500 flex items-center gap-1"><CiAlarmOn /><Lang>Duration</Lang></p>
            <Searches value={searches} onChange={setSearches} />
        </div>

        <Button startContent={<IoRocketOutline />} color="primary" className="justify-self-end"><Lang>Launch Attack</Lang></Button>
    </Card>
}