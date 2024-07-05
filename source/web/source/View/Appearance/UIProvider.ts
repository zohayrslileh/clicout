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

    // Font Medium
    .font-medium {
        font-family: ${() => schema.FONT_MEDIUM};
    }

    // Font Bold
    .font-bold {
        font-family: ${() => schema.FONT_BOLD};
    }

    // Font Light
    .font-light {
        font-family: ${() => schema.FONT_LIGHT};
    }

    // Font Extra Light
    .font-extralight {
        font-family: ${() => schema.FONT_EXTRA_LIGHT};
    }

    // Font Semi Bold
    .font-semibold {
        font-family: ${() => schema.FONT_SEMI_BOLD};
    }

    // Smooth
    .smooth {

        animation: ${keyframes`
            
            from {
                filter: opacity(0);
                transform: translateX(-20px);
            }

            to {
                filter: opacity(1);
                transform: translateX(0);
            }

        `} ease-out 500ms;
    }
`