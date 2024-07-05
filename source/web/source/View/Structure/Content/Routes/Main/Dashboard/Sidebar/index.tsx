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
const Container = styled.div`
    grid-area: sidebar;
    background-color: red;
`