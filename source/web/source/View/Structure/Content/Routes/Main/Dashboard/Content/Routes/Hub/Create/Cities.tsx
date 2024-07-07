import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import ReactCountryFlag from "react-country-flag"
import { useCallback, useState } from "react"
import usePromise from "@/Tools/Promise"
import Country from "@/Core/Country"
import City from "@/Core/City"

/**
 * Cities
 * 
 * @returns 
 */
export default function ({ country, value, onChange, isDisabled }: Props) {

    /**
     * Items
     * 
     */
    const [items, setItems] = useState<City[]>([])

    /**
     * Keyword
     * 
     */
    const [keyword, setKeyword] = useState("")

    /**
     * Cities
     * 
     */
    const cities = usePromise(async function () {

        // Cities
        const cities = await country.cities(keyword)

        // Set items
        setItems(cities)

    }, [keyword, country])

    /**
     * Handle change
     * 
     */
    const handleChange = useCallback(function (id: number) {

        // City
        const city = items.find(city => city.id === id)

        // Set keyword
        if (city) setKeyword(city.name)

        // On change callback
        onChange(city)

    }, [items])

    return <Autocomplete
        variant="bordered"
        isDisabled={isDisabled}
        startContent={value ? <ReactCountryFlag countryCode={country.code} svg /> : undefined}
        label="Select city"
        selectedKey={value?.id.toString() || ""}
        onSelectionChange={key => handleChange(key ? +key.toString() : 0)}
        items={items}
        placeholder="All cities"
        isLoading={cities.pending}
        onInputChange={setKeyword}
    >
        {city => <AutocompleteItem key={city.id} value={city.id} startContent={<ReactCountryFlag countryCode={country.code} svg />}>
            {city.name}
        </AutocompleteItem>}
    </Autocomplete>
}

/**
 * Props
 * 
 */
interface Props {
    country: Country
    isDisabled?: boolean
    value: City | undefined
    onChange: (value: City | undefined) => void
}