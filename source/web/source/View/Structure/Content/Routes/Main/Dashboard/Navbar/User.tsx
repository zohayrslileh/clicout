import Appearance from "@/View/Appearance"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import User from "@/Core/User"

/**
 * Navbar
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
        <Lang>Welcome</Lang>, <b>{user.username}</b>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`

    > b {
        color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
    }
`