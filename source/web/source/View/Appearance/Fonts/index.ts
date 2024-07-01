import MPLUS1CodeExtraLight from "./MPLUS1Code-ExtraLight.ttf"
import MPLUS1CodeSemiBold from "./MPLUS1Code-SemiBold.ttf"
import MPLUS1CodeRegular from "./MPLUS1Code-Regular.ttf"
import MPLUS1CodeMedium from "./MPLUS1Code-Medium.ttf"
import MPLUS1CodeLight from "./MPLUS1Code-Light.ttf"
import MPLUS1CodeBold from "./MPLUS1Code-Bold.ttf"
import { css } from "@emotion/react"

/*
|-----------------------------
|  Fonts
|-----------------------------
|
|
*/
const fonts = css`

    @font-face {
        font-family: MPLUS1Code-ExtraLight;
        src: url(${MPLUS1CodeExtraLight});
    }

    @font-face {
        font-family: MPLUS1Code-SemiBold;
        src: url(${MPLUS1CodeSemiBold});
    }

    @font-face {
        font-family: MPLUS1Code-Regular;
        src: url(${MPLUS1CodeRegular});
    }

    @font-face {
        font-family: MPLUS1Code-Medium;
        src: url(${MPLUS1CodeMedium});
    }

    @font-face {
        font-family: MPLUS1Code-Light;
        src: url(${MPLUS1CodeLight});
    }

    @font-face {
        font-family: MPLUS1Code-Bold;
        src: url(${MPLUS1CodeBold});
    }
`

export default fonts