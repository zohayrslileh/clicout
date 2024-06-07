import { GiFlamingSheet } from "react-icons/gi"
import Button from "@/View/Components/Button"
import Card from "@/View/Components/Card"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"

/**
 * Create
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <div id="left">
            LEFT
        </div>
        <div id="right">
            RIGHT
        </div>
        <Button id="bottom"><GiFlamingSheet /><Lang>Launch Attack</Lang></Button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr auto; 
    grid-template-areas: 
        "left right"
        "bottom bottom";
    gap: 20px;
    padding: 20px;

    > #left {
        grid-area: left;
        margin: auto;
    }

    > #right {
        grid-area: right;
        margin: auto;
    }

    > #bottom {
        grid-area: bottom;
        justify-self: end;
        width: 200px;
        gap: 15px;
    }
`