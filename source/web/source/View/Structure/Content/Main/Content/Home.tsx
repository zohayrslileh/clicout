import JsonView from "@/View/Components/JsonView"
import styled from "@emotion/styled"
import { useContext } from "react"
import User from "@/Core/User"

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = useContext(User.context)

    return <Container>
        <JsonView json={user} />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`