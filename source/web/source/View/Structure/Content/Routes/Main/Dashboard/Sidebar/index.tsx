import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import styled from "@emotion/styled"
import Logout from "./Logout"
import Menu from "./Menu"
import Plan from "./Plan"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Logo width={150} id="logo" />
        <Menu />
        <Plan />
        <Logout />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: sidebar;
    display: grid;
    grid-template-rows: auto 1fr;
    padding: 10px;

    > #logo {
        margin-inline: auto;
        margin-block: 25px;
    }
`