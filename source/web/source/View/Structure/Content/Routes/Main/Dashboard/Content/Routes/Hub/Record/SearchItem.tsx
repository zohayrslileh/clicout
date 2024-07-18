import { BASE_SERVER_URL } from "@/Models/Server/Request"
import Search from "@/Core/Search"
import { useEffect, useRef } from "react"

/**
 * Search item
 * 
 * @returns
 */
export default function ({ search }: Props) {

    const vid = useRef<HTMLVideoElement>(undefined!)

    useEffect(function () {

        vid.current.src = `${BASE_SERVER_URL}stream/${search.recordId}`

        vid.current.currentTime = 999999999

        vid.current.play()

        vid.current.preload

    }, [])

    return <video ref={vid} controls preload="a" />
}

/**
 * Props
 * 
 */
interface Props {
    search: Search
}