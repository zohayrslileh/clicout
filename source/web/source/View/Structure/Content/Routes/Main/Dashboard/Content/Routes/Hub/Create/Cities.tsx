import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import ReactCountryFlag from "react-country-flag"
import { useCallback, useState } from "react"
import { useLang } from "@/Tools/Language"
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
     * Lang
     * 
     */
    const lang = useLang()

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

        // Check country
        if (!country) return

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
        startContent={country ? <ReactCountryFlag countryCode={country.code} svg /> : undefined}
        label={lang("Select city")}
        selectedKey={value?.id.toString() || ""}
        onSelectionChange={key => handleChange(key ? +key.toString() : 0)}
        items={items}
        placeholder={lang("All cities")}
        isLoading={cities.pending}
        onInputChange={setKeyword}
    >
        {city => <AutocompleteItem key={city.id} value={city.id} startContent={country ? <ReactCountryFlag countryCode={country.code} svg /> : undefined}>
            {city.name}
        </AutocompleteItem>}
    </Autocomplete>
}

/**
 * Props
 * 
 */
interface Props {
    country?: Country
    isDisabled?: boolean
    value: City | undefined
    onChange: (value: City | undefined) => void
}