import { useScreen } from "@/Tools/Screen"
import styled from "@emotion/styled"
import Copyright from "./Copyright"
import Language from "./Language"
import Theme from "./Theme"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    /**
     * Screen
     * 
     */
    const screen = useScreen(700)

    return <Container>

        {/** Language */}
        <Language />

        {/** Copyright */}
        {screen ? <Copyright /> : <div />}

        {/** Theme */}
        <Theme />

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    grid-template-columns: 150px 1fr 150px;
    align-items: center;
    padding: 13px 10px;
`