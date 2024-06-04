import Button from "@/View/Components/Button"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Language from "./Language"
import Version from "./Version"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Button><Lang>Buy me a coffee</Lang></Button>
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
    grid-template-columns: 170px 1fr 170px;
    align-items: center;

    > button {
        text-transform: uppercase;
    }

    > *:last-child {
        display: grid;
        justify-items: end;
    }
`