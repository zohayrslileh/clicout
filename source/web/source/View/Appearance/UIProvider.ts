import { NextUIProvider } from "@nextui-org/system"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import schema from "./schema"
import Appearance from "."
import "./index.css"

/*
|-----------------------------
|  UI Provider
|-----------------------------
|
|
*/
export default styled(NextUIProvider)`
    background: ${() => Appearance.theme.schema.BACKGROUND};
    font-family: ${() => schema.FONT_REGULAR};
    position: absolute;
    overflow: hidden;
    display: grid;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    // Smooth
    .smooth {

        animation: ${keyframes`
            
            from {
                opacity: 0;
                transform: translateX(-20px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }

        `} ease-out 500ms;
    }
`