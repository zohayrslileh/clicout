import { Lang } from "@/Tools/Language"
import { useMemo } from "react"
import config from "@/config"

/**
 * Copyright
 * 
 * @returns 
 */
export default function () {

    /**
     * Current Date
     * 
     */
    const currentDate = useMemo(() => new Date, [])

    return <p className="justify-self-center select-none opacity-30">© {currentDate.getFullYear()} {config.APP_NAME} Inc. <Lang>All rights reserved</Lang>.</p>
}