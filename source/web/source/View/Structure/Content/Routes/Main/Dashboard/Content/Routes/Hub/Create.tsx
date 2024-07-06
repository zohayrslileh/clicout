import PendingException from "@/View/Exception/Exceptions/Pending"
import { Autocomplete, AutocompleteItem, Card } from "@nextui-org/react"
import TagsInput from "@/View/Components/TagsInput"
import ReactCountryFlag from "react-country-flag"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import Country from "@/Core/Country"
import { useState } from "react"

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
     * Country code
     * 
     */
    const [countryCode, setCountryCode] = useState<string | undefined>(undefined)

    /**
     * Countries
     * 
     */
    const countries = usePromise(async () => await Country.find(), [])

    // Pending status
    if (countries.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (countries.exception) return <Throw exception={countries.exception.current} />

    /**
     * Country
     * 
     */
    const country = countries.solve.find(country => country.code === countryCode)

    return <Card className="grid gap-5 p-5 max-w-[700px] w-full h-fit mx-auto text-sm">
        <h1 className="text-xl font-medium text-foreground-500 uppercase"><Lang>Create New Attack</Lang></h1>
        <TagsInput value={keywords} onChange={setKeywords} placeHolder="Search Keywords..." />
        <TagsInput value={domains} onChange={setDomains} placeHolder="Domains... (Optional)" />
        <Autocomplete startContent={country ? <ReactCountryFlag countryCode={country.code} svg /> : undefined} label="Select an animal" selectedKey={country ? country.code : ""} onSelectionChange={key => setCountryCode(key ? key.toString() : "")}>
            {countries.solve.map(country => <AutocompleteItem key={country.code} value={country.code} startContent={<ReactCountryFlag countryCode={country.code} svg />}>
                {country.name}
            </AutocompleteItem>)}
        </Autocomplete>
    </Card>
}