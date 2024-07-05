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

    return <div className="relative p-3">

        <Exception>

            <Suspense fallback={<Throw exception={new PendingException} />}>

            <p className="font-medium">Text Font</p>
            <p className="font-bold">Text Font</p>
            <p className="font-light">Text Font</p>
            <p className="font-extralight">Text Font</p>
            <p className="font-semibold">Text Font</p>

            </Suspense>

        </Exception>

    </div>
}