import MontserratExtraLight from "./Montserrat-ExtraLight.ttf"
import MontserratSemiBold from "./Montserrat-SemiBold.ttf"
import MontserratRegular from "./Montserrat-Regular.ttf"
import MontserratMedium from "./Montserrat-Medium.ttf"
import MontserratLight from "./Montserrat-Light.ttf"
import MontserratBold from "./Montserrat-Bold.ttf"
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
        font-family: Montserrat-ExtraLight;
        src: url(${MontserratExtraLight});
    }

    @font-face {
        font-family: Montserrat-SemiBold;
        src: url(${MontserratSemiBold});
    }

    @font-face {
        font-family: Montserrat-Regular;
        src: url(${MontserratRegular});
    }

    @font-face {
        font-family: Montserrat-Medium;
        src: url(${MontserratMedium});
    }

    @font-face {
        font-family: Montserrat-Light;
        src: url(${MontserratLight});
    }

    @font-face {
        font-family: Montserrat-Bold;
        src: url(${MontserratBold});
    }
`

export default fonts