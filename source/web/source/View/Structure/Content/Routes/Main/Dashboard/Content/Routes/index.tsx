import PendingException from "@/View/Exception/Exceptions/Pending"
import { Throw } from "@/Tools/Exception"
import Exception from "@/View/Exception"
import { Suspense } from "react"

/**
 * Routes
 * 
 * @returns
 */
export default function () {

    return <div className="relative p-3 grid">

        <Exception>

            <Suspense fallback={<Throw exception={new PendingException} />}>

                <Throw exception={new PendingException} />

                <p className="uppercase m-auto text-xl opacity-30">no signal</p>

            </Suspense>

        </Exception>

    </div>
}