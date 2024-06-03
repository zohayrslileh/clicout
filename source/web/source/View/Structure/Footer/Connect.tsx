import Appearance from "@/View/Appearance"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import config from "@/config"

/**
 * Connect
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Link to="/connect">{config.APP_NAME} v2.3.1 Pro</Link>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    user-select: none;
    opacity: 0.3;
    gap: 10px;

    > a {
        text-decoration: none;
        color: ${() => Appearance.theme.schema.CONTENT_COLOR.rgba()};
    }
`