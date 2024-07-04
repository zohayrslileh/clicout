import { Link, Route, Routes } from "react-router-dom"
import Appearance from "@/View/Appearance"
import Exception from "@/View/Exception"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { useCallback } from "react"
import User from "@/Core/User"
// import Plans from "./Plans"
import Test from "./Test"

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

    return <Routes>
        <Route index element={<Test />} />
        <Route path=":plan" element={<p>Payment</p>} />
    </Routes>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 10px;

    > h1 {
        display: flex;
        margin: auto;
        width: fit-content;
        gap: 10px;
        font-family: ${() => Appearance.schema.FONT_BOLD};
        
        > p {
            color: ${() => Appearance.schema.COLOR_YELLOW.rgba()};
        }
    }
`