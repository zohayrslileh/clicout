import LinkButton from "@/View/Components/LinkButton"
import languages from "@/View/Language/Languages"
import { IoLanguage } from "react-icons/io5"
import Language from "@/View/Language"
import styled from "@emotion/styled"

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

    return <Container>
        <LinkButton to={""} onClick={() => Language.value = nextLanguage}><IoLanguage />{nextLanguage.name}</LinkButton>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    
    > a {
        display: flex;
        align-items: center;
        gap: 5px;
    }
`