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
            <Plans />
            <Footer />
        </div>
    )
}