import Exception from "@/View/Exception"
import styled from "@emotion/styled"
import Routes from "./Routes"

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <Container>

        <Exception>

            <Routes />

        </Exception>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    position: relative;
    overflow: hidden;
    display: grid;
    flex: 1;
`