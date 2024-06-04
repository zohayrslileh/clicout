import Button from "@/View/Components/Button"
import { CgCoffee } from "react-icons/cg"
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
        <Button><CgCoffee /><Lang>Buy me a coffee</Lang></Button>
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