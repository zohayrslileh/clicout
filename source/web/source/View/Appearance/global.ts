import { css, keyframes } from "@emotion/react"
import schema from "./schema"

/*
|-----------------------------
|  Global styles
|-----------------------------
|
|
*/
export default css`

    // Font Regular
    font-family: ${schema.FONT_REGULAR};

    // Font Medium
    .font-medium {
        font-family: ${schema.FONT_MEDIUM};
    }

    // Font Bold
    .font-bold {
        font-family: ${schema.FONT_BOLD};
    }

    // Font Light
    .font-light {
        font-family: ${schema.FONT_LIGHT};
    }

    // Font Extra Light
    .font-extralight {
        font-family: ${schema.FONT_EXTRA_LIGHT};
    }

    // Font Semi Bold
    .font-semibold {
        font-family: ${schema.FONT_SEMI_BOLD};
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