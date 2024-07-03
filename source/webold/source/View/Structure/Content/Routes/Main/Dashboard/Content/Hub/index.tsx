import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

const Attacks = lazy(() => import("./Attacks"))
const Create = lazy(() => import("./Create"))

/**
 * Hub
 * 
 * @returns 
 */
export default function () {

    return <Routes>
        <Route index element={<Attacks />} />
        <Route path="create" element={<Create />} />
    </Routes>
}