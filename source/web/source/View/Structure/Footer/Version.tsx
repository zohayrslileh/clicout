import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"
import config from "@/config"

/**
 * Version
 * 
 * @returns 
 */
export default function () {

    return <Container>{config.APP_NAME} v2.3.1 <b>Pro</b></Container>
}

/**
 * Container
 * 
 */
const Container = styled.p`
    user-select: none;
    opacity: 0.3;
    margin: auto;

    > b {
        color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
    }
`