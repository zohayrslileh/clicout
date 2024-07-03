import Appearance from "@/View/Appearance"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import User from "@/Core/User"
import Plan from "@/Core/Plan"

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

    /**
     * Plan
     * 
     */
    const plan = Plan.useContext()

    return <Container>
        <Lang>Welcome</Lang>, <b style={{ color: plan.color.hex }}>{user.username}</b>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;

    > b {
        color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
        display: flex;
        align-items: center;
        gap: 7px;
    }
`