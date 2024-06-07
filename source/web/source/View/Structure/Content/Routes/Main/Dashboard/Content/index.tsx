import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import Exception from "@/View/Exception"
import { Suspense, lazy } from "react"
import styled from "@emotion/styled"

const Hub = lazy(() => import("./Hub"))

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
                    <Route index element={<Navigate to="hub" />} />
                    <Route path="hub/*" element={<Hub />} />
                    <Route path="profile" element={<h1>Profile</h1>} />
                </Routes>

            </Suspense>

        </Exception>

    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    grid-area: content;
    position: relative;
    overflow: auto;
    display: grid;
`