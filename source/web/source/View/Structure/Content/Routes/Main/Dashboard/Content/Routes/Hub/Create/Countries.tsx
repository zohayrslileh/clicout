import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import ReactCountryFlag from "react-country-flag"
import { useCallback, useState } from "react"
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
    const countryCode = value ? value.code : undefined

    /**
     * Items
     * 
     */
    const [items, setItems] = useState<Country[]>([])

    /**
     * Keyword
     * 
     */
    const [keyword, setKeyword] = useState("")

    /**
     * Countries
     * 
     */
    const countries = usePromise(async function () {

        // Countries
        const countries = await Country.find(keyword)

        // Set items
        setItems(countries)

    }, [keyword])

    /**
     * Handle change
     * 
     */
    const handleChange = useCallback(function (key: string) {

        // Country
        const country = items.find(country => country.code === key)

        // Set keyword
        if (country) setKeyword(country.name)

        // On change callback
        onChange(country)

    }, [items])

    return <Autocomplete
        variant="bordered"
        startContent={countryCode ? <ReactCountryFlag countryCode={countryCode} svg /> : undefined}
        label="Select country" selectedKey={countryCode || ""}
        onSelectionChange={key => handleChange(key ? key.toString() : "")}
        items={items}
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