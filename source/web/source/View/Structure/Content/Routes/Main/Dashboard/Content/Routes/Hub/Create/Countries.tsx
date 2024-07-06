import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import ReactCountryFlag from "react-country-flag"
import usePromise from "@/Tools/Promise"
import Country from "@/Core/Country"
import { useCallback } from "react"

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
     * Countries
     * 
     */
    const countries = usePromise(async () => await Country.find(""), [])

    /**
     * Handle change method
     * 
     * @returns
     */
    const handleChange = useCallback(function (id: number) {

        // Check countries
        if (!countries.solve) return

        // Country
        const country = countries.solve.find(country => country.id === id)

        // On change callback
        onChange(country)

    }, [countries.solve])

    return <Autocomplete
        variant="bordered"
        startContent={value ? <ReactCountryFlag countryCode={value.code} svg /> : undefined}
        label="Select country"
        selectedKey={countryId.toString()}
        onSelectionChange={key => handleChange(key ? +key.toString() : 0)}
        isLoading={countries.pending}
    >
        {(countries.solve || []).map(country => <AutocompleteItem key={country.id} value={country.id} startContent={<ReactCountryFlag countryCode={country.code} svg />}>
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