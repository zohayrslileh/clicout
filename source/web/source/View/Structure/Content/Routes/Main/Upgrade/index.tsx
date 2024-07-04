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
        <div className="container grid m-auto justify-items-center">
            <Header />
            <Plans />
            <Footer />
        </div>
    )
}