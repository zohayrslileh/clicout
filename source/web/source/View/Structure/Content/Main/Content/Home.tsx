import JsonView from "@/View/Components/JsonView"
import styled from "@emotion/styled"
import { useContext } from "react"
import User from "@/Core/User"
import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = useContext(User.context)

    /**
     * Subscription
     * 
     */
    const subscription = usePromise(async () => await user.subscription(), [])

    // Pending status
    if (subscription.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (subscription.exception) return <Throw exception={subscription.exception.current} />

    return <Container>
        <JsonView json={user} />
        {subscription.solve ? <JsonView json={subscription.solve} /> : "You don't have subscription"}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`