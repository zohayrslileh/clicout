import styled from "@emotion/styled"
import Content from "./Content"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

/**
 * Dashboard
 * 
 * @returns 
 */
export default function () {

    return <Container>

        {/** Navbar */}
        <Navbar />

        {/** Sidebar */}
        <Sidebar />

        {/** Content */}
        <Content />

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid; 
    grid-template-columns: auto 1fr; 
    grid-template-rows: auto 1fr; 
    gap: 10px; 
    grid-template-areas: 
        "sidebar navbar"
        "sidebar content";
    height: 100%;
    overflow: hidden;
`