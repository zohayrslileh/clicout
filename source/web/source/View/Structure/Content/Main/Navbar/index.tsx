import Card from "@/View/Components/Card"
import styled from "@emotion/styled"
import Navigator from "./Navigator"

/**
 * Navbar
 * 
 * @returns 
 */
export default function () {


    return <Container className="animation">
        <Navigator />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: navbar;
    display: flex;
    align-items: center;
    justify-content: space-between;
`