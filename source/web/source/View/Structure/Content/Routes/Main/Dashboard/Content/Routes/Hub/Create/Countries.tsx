import PendingException from "@/View/Exception/Exceptions/Pending"
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import ReactCountryFlag from "react-country-flag"
import { useEffect, useState } from "react"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import Country from "@/Core/Country"

/**
 * Countries
 * 
 * @returns 
 */
export default function ({ value, onChange }: Props) {

    /**
     * Country code
     * 
     */
    const [countryCode, setCountryCode] = useState<string | undefined>(value ? value.code : undefined)

    /**
     * Countries
     * 
     */
    const countries = usePromise(async () => await Country.find(), [])

    /**
     * On country code change
     * 
     */
    useEffect(function () {

        // Check countries solve
        if (!countries.solve) return

        /**
         * Country
         * 
         */
        const country = countries.solve.find(country => country.code === countryCode)

        // On change callback
        onChange(country)

    }, [countryCode])

    // Pending status
    if (countries.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (countries.exception) return <Throw exception={countries.exception.current} />

    return <Autocomplete startContent={countryCode ? <ReactCountryFlag countryCode={countryCode} svg /> : undefined} label="Select an animal" selectedKey={countryCode || ""} onSelectionChange={key => setCountryCode(key ? key.toString() : "")}>
        {countries.solve.map(country => <AutocompleteItem key={country.code} value={country.code} startContent={<ReactCountryFlag countryCode={country.code} svg />}>
            {country.name}
        </AutocompleteItem>)}
    </Autocomplete>
}

/**
 * Props
 * 
 */
interface Props {
    value: Country | undefined
    onChange: (value: Country | undefined) => void
}