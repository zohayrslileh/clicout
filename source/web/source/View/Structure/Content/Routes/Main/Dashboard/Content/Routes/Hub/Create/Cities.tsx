import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { useCallback, useState } from "react"
import usePromise from "@/Tools/Promise"
import Country from "@/Core/Country"
import City from "@/Core/City"

/**
 * Cities
 * 
 * @returns 
 */
export default function ({ country, value, onChange }: Props) {

    /**
     * City id
     * 
     */
    const cityId = value ? value.id : 0

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

    }, [keyword])

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
        label="Select city" selectedKey={cityId}
        onSelectionChange={key => handleChange(key ? +key.toString() : 0)}
        items={items}
        isLoading={cities.pending}
        onInputChange={setKeyword}
        inputValue={keyword}
    >
        {city => <AutocompleteItem key={city.id} value={city.id}>
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
    value: City | undefined
    onChange: (value: City | undefined) => void
}