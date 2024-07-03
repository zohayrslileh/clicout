import { useMemo } from "react"
import config from "@/config"

/**
 * Version
 * 
 * @returns 
 */
export default function () {

    /**
     * Current Date
     * 
     */
    const currentDate = useMemo(() => new Date, [])

    return <p className="justify-self-center select-none opacity-30">© {currentDate.getFullYear()} {config.APP_NAME} Inc. All rights reserved.</p>
}