import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

const Record = lazy(() => import("./Record"))
const Create = lazy(() => import("./Create"))
const Single = lazy(() => import("./Single"))

/**
 * Hub
 * 
 * @returns
 */
export default function () {

    return <Routes>
        <Route index element={<Record />} />
        <Route path="create" element={<Create />} />
        <Route path=":id" element={<Single />} />
    </Routes>
}