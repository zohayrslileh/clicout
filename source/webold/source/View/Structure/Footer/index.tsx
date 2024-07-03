import styled from "@emotion/styled"
import Language from "./Language"
import Version from "./Version"
import Coffee from "./Coffee"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Coffee />
        <Version />
        <Language />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    grid-template-columns: 190px 1fr 190px;
    align-items: center;

    > button {
        text-transform: uppercase;
    }

    > *:last-child {
        display: grid;
        justify-items: end;
    }
`