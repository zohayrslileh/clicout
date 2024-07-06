import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import ReactCountryFlag from "react-country-flag"
import { useEffect, useState } from "react"
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
     * Keyword
     * 
     */
    const [keyword, setKeyword] = useState("")

    /**
     * Countries
     * 
     */
    const countries = usePromise(async () => await Country.find(keyword), [keyword])

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

    return <Autocomplete
        variant="bordered"
        startContent={countryCode ? <ReactCountryFlag countryCode={countryCode} svg /> : undefined}
        label="Select country" selectedKey={countryCode || ""}
        onSelectionChange={key => setCountryCode(key ? key.toString() : "")}
        items={countries.solve || []}
        isLoading={countries.pending}
        onInputChange={setKeyword}
        inputValue={keyword}
    >
        {country => <AutocompleteItem key={country.code} value={country.code} startContent={<ReactCountryFlag countryCode={country.code} svg />}>
            {country.name}
        </AutocompleteItem>}
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