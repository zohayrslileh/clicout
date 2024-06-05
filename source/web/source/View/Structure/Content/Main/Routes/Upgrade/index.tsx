import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import User from "@/Core/User"
import Plans from "./Plans"

/**
 * Upgrade
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = User.useContext()

    return <Container>
        <h1><Lang>Welcome</Lang>, {user.username}</h1>
        <p>Please choose you plan</p>
        <Plans />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`