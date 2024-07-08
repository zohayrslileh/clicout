import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Content from "./Content"
import Footer from "./Footer"

/**
 * Structure
 * 
 * @returns 
 */
export default function () {

    /**
     * Browser Router
     * 
     */
    return <BrowserRouter>

        <div className="grid grid-rows-[1fr_auto] overflow-hidden">

            {/** Content */}
            <Content />

            {/** Footer */}
            <Footer />

            {/** Toaster */}
            <Toaster />

        </div>

    </BrowserRouter>
}