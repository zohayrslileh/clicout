import PendingException from "@/View/Exception/Exceptions/Pending"
import JsonView from "@/View/Components/JsonView"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import User from "@/Core/User"

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
    const user = User.useContext()

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