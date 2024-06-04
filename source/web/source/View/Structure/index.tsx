import armouryCrateBackground from "@/View/Media/armoury-crate-background.jpg"
import { BrowserRouter } from "react-router-dom"
import styled from "@emotion/styled"
import Content from "./Content"
import Footer from "./Footer"

/**
 * Structure
 * 
 * @returns 
 */
export default function () {

    /**
     * Browser Router
     * 
     */
    return <BrowserRouter>

        <Container>

            {/** Content */}
            <Content />

            {/** Footer */}
            <Footer />

        </Container>

    </BrowserRouter>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    padding: 15px;
    height: 100%;
    background-image: url(${armouryCrateBackground});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
`