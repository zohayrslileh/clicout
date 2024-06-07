import TextInput from "@/View/Components/TextInput"
import { GiFlamingSheet } from "react-icons/gi"
import Button from "@/View/Components/Button"
import Appearance from "@/View/Appearance"
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
            <div className="card">
                <div id="body"></div>
                <TextInput placeholder="Add keyword" value="" onChange={x => x} />
            </div>
            <div className="card">
                <div id="body"></div>
                <TextInput placeholder="Add domain" value="" onChange={x => x} />
            </div>
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
        display: grid;
        gap: 20px;

        > .card {
            display: grid;
            grid-template-rows: 1fr auto;

            > #body {
                border: 1px solid ${() => Appearance.schema.COLOR_WHITE.rgba(0.16)};
                border-bottom: none;
                overflow: auto;
                padding: 15px;
            }
        }
    }

    > #right {
        grid-area: right;
    }

    > #bottom {
        grid-area: bottom;
        justify-self: end;
        width: 200px;
        gap: 15px;
    }
`