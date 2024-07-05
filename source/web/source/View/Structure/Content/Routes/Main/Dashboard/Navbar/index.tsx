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
const Container = styled.div`
    grid-area: navbar;
    background-color: green;
`