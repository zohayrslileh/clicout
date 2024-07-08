import { BrowserRouter } from "react-router-dom"
import Content from "./Content"
import Toaster from "./Toaster"
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