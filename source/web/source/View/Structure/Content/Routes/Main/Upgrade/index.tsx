import { Link, Route, Routes } from "react-router-dom"
import Appearance from "@/View/Appearance"
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
        <h1 className="text-3xl"><Lang>Welcome</Lang>, <p>{user.username}</p></h1>
        <p>Please choose the plan that suits you.</p>
        <div>
            <Exception>
                <Routes>
                    <Route index element={<Plans />} />
                    <Route path=":plan" element={<p>Payment</p>} />
                </Routes>
            </Exception>
        </div>
        <Link className="text-primary" to="" onClick={logout}><Lang>Logout</Lang></Link>
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
    gap: 10px;
    padding-block: 30px 5px;

    > h1 {
        display: flex;
        margin: auto;
        width: fit-content;
        gap: 10px;
        margin-block: 0;
        font-family: ${() => Appearance.schema.FONT_BOLD};
        
        > p {
            color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
            margin: 0;
        }
    }

    > p {
        user-select: none;
        opacity: 0.3;
    }
`