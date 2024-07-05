import Navbar from "./Navbar"
import Routes from "./Routes"

/**
 * Content
 * 
 * @returns
 */
export default function () {

    return <div className="relative overflow-x-hidden overflow-y-auto bg-blue-700">

        {/** Navbar */}
        <Navbar />

        {/** Routes */}
        <Routes />

    </div>
}