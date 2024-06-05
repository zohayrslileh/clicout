import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import { lazy, Suspense } from "react"
import User from "@/Core/User"

const Auth = lazy(() => import("./Auth"))
const Main = lazy(() => import("./Main"))

/**
 * Content
 * 
 * @returns 
 */
export default function () {

    /**
     * Authentication
     * 
     */
    const authentication = User.useAuthentication()

    // Pending status
    if (authentication.pending) return <Throw exception={new PendingException} />

    // Exception status
    if (authentication.exception) return <Throw exception={authentication.exception.current} />

    return <Suspense fallback={<Throw exception={new PendingException} />}>

        <Routes>

            {/** Index */}
            <Route index element={<Navigate to="/main" />} />

            {/** Main */}
            <Route path="/main/*" element={authentication.solve ? <Main user={authentication.solve} /> : <Navigate to="/auth" />} />

            {/** Auth */}
            <Route path="/auth/*" element={authentication.solve ? <Navigate to="/main" /> : <Auth />} />

        </Routes>

    </Suspense>
}