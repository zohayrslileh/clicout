import Attack from "@/Core/Attack"
import { useCallback, useRef } from "react"
import User from "@/Core/User"

/**
 * Video
 * 
 * @returns
 */
export default function ({ attack }: Props) {

    /**
     * Namespace
     * 
     */
    const namespace = User.useNamespace()

    /**
     * Video 1
     * 
     */
    const video1 = useRef<HTMLVideoElement>(undefined!)

    /**
     * Video 2
     * 
     */
    const video2 = useRef<HTMLVideoElement>(undefined!)

    /**
     * Video head
     * 
     */
    const videoHead = useRef<ArrayBuffer | undefined>()

    /**
     * Chunks
     * 
     */
    const chunks = useRef<ArrayBuffer[]>([])

    /**
     * On record chunk
     * 
     */
    namespace.useOn(`${attack.id}:record-chunk`, async function (chunk: ArrayBuffer) {

        // Set video head
        if (!videoHead.current) return videoHead.current = chunk

        // Set chunks
        chunks.current = [...chunks.current.slice(0, 20), chunk]
    })

    /**
     * Play
     * 
     * @returns
     */
    const play = useCallback(function () {

    }, [])

    return <div>
        <video ref={video1} controls />
        <video ref={video2} controls />
    </div>
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}