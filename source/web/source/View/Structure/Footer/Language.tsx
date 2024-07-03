import { Select, SelectItem } from "@nextui-org/react"
import ReactCountryFlag from "react-country-flag"
import languages from "@/View/Language/Languages"
import Language from "@/View/Language"
import { useCallback } from "react"

/**
 * Language
 * 
 * @returns 
 */
export default function () {

    /**
     * Language
     * 
     */
    const language = Language.value

    /**
     * Handle change
     * 
     * @returns
     */
    const handleChange = useCallback(function (key: string) {

        // Language
        const language = languages.find(language => language.key === key)

        // Change language
        Language.value = language || languages[0]

    }, [])

    return <Select startContent={<ReactCountryFlag countryCode={language.country} svg />} selectedKeys={[language.key]} onSelectionChange={([key]) => handleChange(key.toString())}>
        {languages.map(language => <SelectItem key={language.key} startContent={<ReactCountryFlag countryCode={language.country} svg />}>{language.name}</SelectItem>)}
    </Select>
}