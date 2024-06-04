import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import Exception from "@/View/Exception"
import { lazy, Suspense } from "react"
import styled from "@emotion/styled"

const Auth = lazy(() => import("./Auth"))
const Main = lazy(() => import("./Main"))

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
                    <Route index element={<Navigate to="/main" />} />
                    <Route path="/main/*" element={<Main />} />
                    <Route path="/auth/*" element={<Auth />} />
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
    position: relative;
    overflow: hidden;
    display: grid;
    flex: 1;
`