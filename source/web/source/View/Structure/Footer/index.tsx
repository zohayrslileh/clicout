import styled from "@emotion/styled"
import Language from "./Language"
import Connect from "./Connect"
import Theme from "./Theme"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Theme />
        <Connect />
        <Language />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    justify-content: space-between;
    align-items: center;
    display: flex;
    gap: 10px;
`