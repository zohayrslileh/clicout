import { Route, Routes } from "react-router-dom"
import Exception from "@/View/Exception"
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
            <div className="grid justify-items-center relative w-full min-h-[200px]">
                <Exception>
                    <Routes>
                        <Route index element={<Plans />} />
                        <Route path=":plan" element={<Payment />} />
                    </Routes>
                </Exception>
            </div>
            <Footer />
        </div>
    )
}