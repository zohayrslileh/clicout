import { CiAlarmOn, CiFlag1, CiLocationOn, CiWifiOn } from "react-icons/ci"
import { HiOutlineExternalLink } from "react-icons/hi"
import { Button, Checkbox } from "@nextui-org/react"
import TagsInput from "@/View/Components/TagsInput"
import { IoRocketOutline } from "react-icons/io5"
import { Link, Navigate } from "react-router-dom"
import { Lang, useLang } from "@/Tools/Language"
import { PiDevicesThin } from "react-icons/pi"
import { useCallback, useState } from "react"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import Country from "@/Core/Country"
import Countries from "./Countries"
import Attack from "@/Core/Attack"
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
     * Lang
     * 
     */
    const lang = useLang()

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
     * With proxies
     * 
     */
    const [withProxies, setWithProxies] = useState<boolean>(false)

    /**
     * Device
     * 
     */
    const [device, setDevice] = useState<string | undefined>(undefined)

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

    /**
     * Searches handle method
     * 
     * @returns 
     */
    const searchesHandle = useCallback(function (searches: number) {

        if (plan.searches && (searches < 1 || searches > plan.searches)) return

        if (!plan.searches && searches < 0) return

        setSearches(searches)

    }, [plan])

    /**
     * Attack promise
     * 
     */
    const attackPromise = usePromise(async () => await Attack.create({
        keywords,
        domains,
        domainsAction,
        countryId: country ? country.id : undefined,
        cityId: city ? city.id : undefined,
        withProxies,
        device,
        searches
    }))

    // Solve status
    if (attackPromise.solve) return <Navigate to=".." />

    return <Card className="grid smooth gap-6 p-5 mt-5 max-w-[700px] w-full h-fit mx-auto text-sm bg-background">

        <h1 className="text-xl font-medium text-foreground-500 uppercase"><Lang>Create New Attack</Lang></h1>

        <div className="grid gap-3">
            <p className="text-foreground-500 flex items-center gap-1"><CiFlag1 /><Lang>Target</Lang></p>
            <TagsInput label={`${keywords.length} / 20`} beforeAddValidate={keywordValidation} value={keywords} onChange={setKeywords} placeHolder={`${lang("Search Keywords")}...`} />
            <TagsInput label={`${domains.length} / 20`} beforeAddValidate={domainValidation} value={domains} onChange={setDomains} placeHolder={`${lang("Domains")}... (${lang("Optional")})`} />
            <div className="flex gap-5">
                <Checkbox size="sm" isSelected={domainsAction === "IGNORE"} onValueChange={isSelected => isSelected && setDomainsAction("IGNORE")} value="ignore"><Lang>Ignore this domains</Lang></Checkbox>
                <Checkbox size="sm" isSelected={domainsAction === "CLICK"} onValueChange={isSelected => isSelected && setDomainsAction("CLICK")} value="click"><Lang>Click this domains</Lang></Checkbox>
            </div>
        </div>

        <div className="grid gap-3">
            <div className="text-foreground-500 flex justify-between">
                <p className="flex items-center gap-1"><CiLocationOn /><Lang>Location</Lang></p>
                {!plan.customizeLocation && <p><Link to="/main/upgrade" className="text-primary underline"><Lang>Upgrade</Lang></Link> <Lang>to customize location</Lang></p>}
            </div>
            <Countries isDisabled={!plan.customizeLocation} value={country} onChange={setCountry} />
            <Cities isDisabled={!plan.customizeLocation} country={country} value={city} onChange={setCity} />
            {country && city && <p className="justify-self-end">{city.name}, {country.name} check it in <a href={`https://www.google.com/maps/@${city.latitude},${city.longitude},15z`} target="_blank" className="text-primary inline-flex gap-1 items-center">Google Maps <HiOutlineExternalLink /></a></p>}
        </div>

        <div className="gap-3 hidden">
            <div className="text-foreground-500 flex justify-between">
                <p className="flex items-center gap-1"><CiWifiOn /><Lang>Network</Lang></p>
                {!plan.enableProxies && <p><Link to="/main/upgrade" className="text-primary underline"><Lang>Upgrade</Lang></Link> <Lang>to enable proxies</Lang></p>}
            </div>
            <Checkbox isDisabled={!plan.enableProxies} isSelected={withProxies} onValueChange={setWithProxies}><Lang>Use proxies</Lang></Checkbox>
        </div>

        <div className="grid gap-3">
            <div className="text-foreground-500 flex justify-between">
                <p className="flex items-center gap-1"><PiDevicesThin /><Lang>Devices</Lang></p>
                {!plan.customizeDevices && <p><Link to="/main/upgrade" className="text-primary underline"><Lang>Upgrade</Lang></Link> <Lang>to customize devices</Lang></p>}
            </div>
            <Devices isDisabled={!plan.customizeDevices} value={device} onChange={setDevice} />
        </div>

        <div className="grid gap-3">
            <div className="text-foreground-500 flex justify-between">
                <p className="flex items-center gap-1"><CiAlarmOn /><Lang>Duration</Lang></p>
                {plan.searches ? <p><Link to="/main/upgrade" className="text-primary underline"><Lang>Upgrade</Lang></Link> <Lang>to unlimited searches</Lang></p> : undefined}
            </div>
            <div>
                <Searches value={searches} onChange={searchesHandle} />
                <p className="text-[12px] italic text-foreground-500">{plan.searches ? `${lang("Maximum")}: ${plan.searches}` : undefined}</p>
            </div>
        </div>

        <Button onClick={attackPromise.safeExecute} isLoading={attackPromise.pending} startContent={<IoRocketOutline />} color="primary" className="justify-self-end"><Lang>Launch Attack</Lang></Button>

    </Card>
}