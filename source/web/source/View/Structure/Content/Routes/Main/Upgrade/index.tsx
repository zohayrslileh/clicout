import LinkButton from "@/View/Components/LinkButton"
import { Route, Routes } from "react-router-dom"
import Appearance from "@/View/Appearance"
import Grid from "@/View/Components/Grid"
import Exception from "@/View/Exception"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { useCallback } from "react"
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

    /**
     * Controller
     * 
     */
    const controller = User.useController()

    /**
     * Logout method
     * 
     * @returns
     */
    const logout = useCallback(function () {

        // Logout
        User.logout()

        // Dispatch user
        controller.dispatch(undefined)

    }, [])

    return <Container>
        <h1><Lang>Welcome</Lang>, <p>{user.username}</p></h1>
        <p>Please choose the plan that suits you.</p>
        <Grid>
            <Exception>
                <Routes>
                    <Route index element={<Plans />} />
                </Routes>
            </Exception>
        </Grid>
        <LinkButton to="" onClick={logout}><Lang>Logout</Lang></LinkButton>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    text-align: center;
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 20px;
    padding-block: 30px;

    > h1 {
        display: flex;
        margin: auto;
        width: fit-content;
        gap: 10px;
        margin-block: 0;
        
        > p {
            color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
            margin: 0;
        }
    }

    > p {
        user-select: none;
        margin-block: 0;
        opacity: 0.3;
    }
`