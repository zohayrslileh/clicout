import { useCallback, useEffect, useRef } from "react"
import Attack from "@/Core/Attack"
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
     * Video
     * 
     */
    const video = useRef<HTMLVideoElement>(undefined!)

    /**
     * Chunks
     * 
     */
    const chunks = useRef<ArrayBuffer[]>([])

    /**
     * Current time 
     * 
     */
    const currentTime = useRef<number>(0)

    /**
     * On record chunk
     * 
     */
    namespace.useOn(`${attack.id}:record-chunk`, async function (chunk: ArrayBuffer) {

        // Push new chunk
        chunks.current.push(chunk)

        // Play if not played
        if (video.current.paused || video.current.ended) await play()
    })

    /**
     * Play method
     * 
     */
    const play = useCallback(async function () {

        // Create blob
        const blob = new Blob(chunks.current, { type: "video/webm" })

        // Set video source
        video.current.src = URL.createObjectURL(blob)

        // Set current time
        video.current.currentTime = currentTime.current + 5

        // Play
        await video.current.play()

    }, [])

    /**
     * Effect
     * 
     */
    useEffect(function () {

        // On ended
        video.current.onended = function () {

            // Revoke source
            URL.revokeObjectURL(video.current.src)

            // Set current time
            currentTime.current = video.current.currentTime
        }

    }, [])

    return <div>
        <video ref={video} />
    </div>
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}