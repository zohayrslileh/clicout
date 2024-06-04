import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import config from "@/config"

/**
 * Coffe
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
`