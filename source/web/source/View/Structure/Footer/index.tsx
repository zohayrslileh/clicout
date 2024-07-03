import styled from "@emotion/styled"
import Language from "./Language"
import Version from "./Version"
import Theme from "./Theme"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container>

        {/** Language */}
        <Language />

        {/** Version */}
        <Version />

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