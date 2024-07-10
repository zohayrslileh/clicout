import { useCallback, useRef } from "react"
import styled from "@emotion/styled"
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
     * Container
     * 
     */
    const container = useRef<HTMLDivElement>(undefined!)

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

        // Push new chunk
        chunks.current.push(chunk)

        // Play
        await play()
    })

    /**
     * Play method
     * 
     */
    const play = useCallback(async function () {

        // Get videos
        const videos = container.current.querySelectorAll("video")

        // Revoke prev videos
        for (const video of videos) URL.revokeObjectURL(video.src)

        // Create video
        const video = document.createElement("video")

        // Create blob
        const blob = new Blob(chunks.current, { type: "video/webm" })

        // Set video source
        video.src = URL.createObjectURL(blob)

        // Set current time
        video.currentTime = 9999999999999

        // Play
        await video.play()

        // Append to child
        container.current.appendChild(video)

        // Remove all and keep one
        for (const video of [...videos].slice(0, -1)) video.remove()

    }, [])

    return <Container ref={container} />
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}

/**
 * Container
 * 
 */
const Container = styled.div`
    position: relative;

    > video {
        position: absolute;

        &:last-child {
            position: relative;
        }
    }
`