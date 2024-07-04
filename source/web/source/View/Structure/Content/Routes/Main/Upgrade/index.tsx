import { Route, Routes } from "react-router-dom"
import Payment from "./Payment"
import Header from "./Header"
import Footer from "./Footer"
import Plans from "./Plans"

/**
 * Upgrade
 * 
 * @returns 
 */
export default function () {

    return (
        <div className="container grid gap-10 p-5 m-auto justify-items-center">
            <Header />
            <Routes>
                <Route index element={<Plans />} />
                <Route path=":plan" element={<Payment />} />
            </Routes>
            <Footer />
        </div>
    )
}