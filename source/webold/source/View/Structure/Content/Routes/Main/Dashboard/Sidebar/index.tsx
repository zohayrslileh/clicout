import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import styled from "@emotion/styled"
import Logout from "./Logout"
import Menu from "./Menu"

/**
 * Sidebar
 * 
 * @returns 
 */
export default function () {

    return <Container>
        <Logo width={150} id="logo" />
        <Menu />
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
    padding: 40px 15px;
    justify-items: center;
    gap: 30px;
`