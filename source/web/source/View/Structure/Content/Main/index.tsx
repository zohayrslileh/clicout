import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import styled from "@emotion/styled"
import Content from "./Content"
import Sidebar from "./Sidebar"
import User from "@/Core/User"
import Navbar from "./Navbar"

/**
 * Main
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = User.useAuthentication()

    // Pending status
    if (user.pending) return <Throw exception={new PendingException} />

    // Unauthorized status
    if (user.unauthorized) return <Navigate to="/auth" />

    // Exception status
    if (user.exception) return <Throw exception={user.exception.current} />

    // Authorized status
    return <Container>

        <User.context.Provider value={user.solve}>

            {/** Navbar */}
            <Navbar />

            {/** Sidebar */}
            <Sidebar />

            {/** Content */}
            <Content />

        </User.context.Provider>

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