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
     * Country id
     * 
     */
    const countryId = value ? value.id : 0

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
    const handleChange = useCallback(function (id: number) {

        // Country
        const country = items.find(country => country.id === id)

        // Set keyword
        if (country) setKeyword(country.name)

        // On change callback
        onChange(country)

    }, [items])

    return <Autocomplete
        variant="bordered"
        startContent={value ? <ReactCountryFlag countryCode={value.code} svg /> : undefined}
        label="Select country" selectedKey={countryId}
        onSelectionChange={key => handleChange(key ? +key.toString() : 0)}
        items={items}
        isLoading={countries.pending}
        onInputChange={setKeyword}
        inputValue={keyword}
    >
        {country => <AutocompleteItem key={country.id} value={country.id} startContent={<ReactCountryFlag countryCode={country.code} svg />}>
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