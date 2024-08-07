import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import ReactCountryFlag from "react-country-flag"
import { useCallback, useState } from "react"
import { useLang } from "@/Tools/Language"
import { TfiWorld } from "react-icons/tfi"
import usePromise from "@/Tools/Promise"
import Country from "@/Core/Country"

/**
 * Countries
 * 
 * @returns 
 */
export default function ({ value, onChange, isDisabled }: Props) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

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
        isDisabled={isDisabled}
        startContent={value ? <ReactCountryFlag countryCode={value.code} svg /> : <TfiWorld />}
        label={lang("Select country")}
        selectedKey={value?.id.toString() || ""}
        onSelectionChange={key => handleChange(key ? +key.toString() : 0)}
        items={items}
        placeholder={lang("Whole world")}
        isLoading={countries.pending}
        onInputChange={setKeyword}
    >
        {country => <AutocompleteItem key={country.id} value={country.id} startContent={country.code === "WW" ? <TfiWorld /> : <ReactCountryFlag countryCode={country.code} svg />}>
            {country.name}
        </AutocompleteItem>}
    </Autocomplete>
}

/**
 * Props
 * 
 */
interface Props {
    isDisabled?: boolean
    value: Country | undefined
    onChange: (value: Country | undefined) => void
}