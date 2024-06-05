import PendingException from "@/View/Exception/Exceptions/Pending"
import LinkButton from "@/View/Components/LinkButton"
import Authorization from "@/Models/Authorization"
import { useNavigate } from "react-router-dom"
import Appearance from "@/View/Appearance"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import styled from "@emotion/styled"
import { useCallback } from "react"
import User from "@/Core/User"
import Plan from "@/Core/Plan"
import Plans from "./Plans"

/**
 * Upgrade
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    /**
     * User
     * 
     */
    const user = User.useContext()

    /**
     * Plans promise
     * 
     */
    const plans = usePromise(async () => await Plan.find(), [])

    /**
     * Logout method
     * 
     * @returns
     */
    const logout = useCallback(function () {

        Authorization.value = ""

        navigate("/auth")

    }, [])

    // Pending status
    if (plans.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (plans.exception) return <Throw exception={plans.exception.current} />

    return <Container>
        <h1><Lang>Welcome</Lang>, <p>{user.username}</p></h1>
        <p>Please choose the plan that suits you.</p>
        <Plans plans={plans.solve} />
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