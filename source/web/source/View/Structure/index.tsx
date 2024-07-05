import { BrowserRouter } from "react-router-dom"
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

        <div className="grid grid-cols-[1fr_auto]">

            {/** Content */}
            <Content />

            {/** Footer */}
            <Footer />

        </div>

    </BrowserRouter>
}