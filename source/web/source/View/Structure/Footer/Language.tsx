import LinkButton from "@/View/Components/LinkButton"
import languages from "@/View/Language/Languages"
import Language from "@/View/Language"

/**
 * Language
 * 
 * @returns 
 */
export default function () {

    /**
     * Next language
     * 
     */
    const nextLanguage = languages.find(language => language !== Language.value) || languages[0]

    return <LinkButton onClick={() => Language.value = nextLanguage}>{nextLanguage.name}</LinkButton>
}