import PendingException from "@/View/Exception/Exceptions/Pending"
import { Navigate, Route, Routes } from "react-router-dom"
import { Throw } from "@/Tools/Exception"
import { lazy, Suspense } from "react"

const Hub = lazy(() => import("./Hub"))

/**
 * Routes
 * 
 * @returns
 */
export default function () {

    return <div className="relative grid pt-5">

        <Suspense fallback={<Throw exception={new PendingException} />}>

            <Routes>
                <Route index element={<Navigate to="hub" />} />
                <Route path="hub/*" element={<Hub />} />
            </Routes>

        </Suspense>

    </div>
}