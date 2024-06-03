import PendingException from "@/View/Exception/Exceptions/Pending"
import { Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import Exception from "@/View/Exception"
import { lazy, Suspense } from "react"
import styled from "@emotion/styled"
import Login from "./Auth/Login"

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
                    <Route index element={<Login />} />
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
    flex: 1;
    display: grid;
`