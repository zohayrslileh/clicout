import Card from "@/View/Components/Card"
import styled from "@emotion/styled"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <h1>Sidebar</h1>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: sidebar;
`