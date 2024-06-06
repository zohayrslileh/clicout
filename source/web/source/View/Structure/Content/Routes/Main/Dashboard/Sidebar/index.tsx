import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import styled from "@emotion/styled"
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
    padding: 15px;

    > #logo {
        margin-inline: auto;
        margin-block: 30px;
    }
`