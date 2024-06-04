import Button from "@/View/Components/Button"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import Language from "./Language"
import Connect from "./Connect"

/**
 * Footer
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Button><Lang>Buy me a coffee</Lang></Button>
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

    > button {
        text-transform: uppercase;
    }
`