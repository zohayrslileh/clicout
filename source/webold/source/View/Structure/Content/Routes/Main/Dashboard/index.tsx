import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import Content from "./Content"
import Sidebar from "./Sidebar"
import User from "@/Core/User"
import Plan from "@/Core/Plan"
import Navbar from "./Navbar"

/**
 * Dashboard
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = User.useContext()

    /**
     * Plan promise
     * 
     */
    const plan = usePromise(async () => await user.plan(), [])

    // Pending status
    if (plan.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (plan.exception) return <Throw exception={plan.exception.current} />

    return <Container>

        <Plan.context.Provider value={plan.solve}>

            {/** Navbar */}
            <Navbar />

            {/** Sidebar */}
            <Sidebar />

            {/** Content */}
            <Content />

        </Plan.context.Provider>

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