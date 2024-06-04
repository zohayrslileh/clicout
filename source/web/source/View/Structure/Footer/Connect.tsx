import Appearance from "@/View/Appearance"
import styled from "@emotion/styled"
import config from "@/config"

/**
 * Connect
 * 
 * @returns 
 */
export default function () {

    return <Container>{config.APP_NAME} v2.3.1 Pro</Container>
}

/**
 * Container
 * 
 */
const Container = styled.p`
    display: flex;
    align-items: center;
    user-select: none;
    opacity: 0.3;
    margin: auto;
    gap: 10px;

    > a {
        text-decoration: none;
        color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
    }
`