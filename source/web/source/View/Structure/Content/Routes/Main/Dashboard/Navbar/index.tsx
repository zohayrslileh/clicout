import Card from "@/View/Components/Card"
import styled from "@emotion/styled"

/**
 * Navbar
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <h1>Navbar</h1>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: navbar;
`