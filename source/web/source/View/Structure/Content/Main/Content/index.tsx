import PendingException from "@/View/Exception/Exceptions/Pending"
import { Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import Card from "@/View/Components/Card"
import Exception from "@/View/Exception"
import styled from "@emotion/styled"
import { Suspense } from "react"
import Home from "./Home"

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <Container>

        <Exception>

            <Suspense fallback={<Throw exception={new PendingException} />}>

                <Routes>
                    <Route index element={<Home />} />
                </Routes>

            </Suspense>

        </Exception>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    grid-area: content;
    position: relative;
    padding: 20px;
    overflow: auto;
    display: grid;
`