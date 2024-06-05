import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import { lazy, Suspense } from "react"

const Auth = lazy(() => import("./Auth"))
const Main = lazy(() => import("./Main"))

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    return <Suspense fallback={<Throw exception={new PendingException} />}>

        <Routes>
            <Route index element={<Navigate to="/main" />} />
            <Route path="/main/*" element={<Main />} />
            <Route path="/auth/*" element={<Auth />} />
        </Routes>

    </Suspense>
}