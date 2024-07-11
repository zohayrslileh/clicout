import webmHeader from "@/View/Media/webm-header.txt?raw"
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

        // Clear
        if (chunks.current.length > 10) chunks.current = []

        // Push new chunk
        chunks.current.push(chunk)

        // Play
        if (chunks.current.length >= 10) await play(chunks.current)
    })

    /**
     * Play method
     * 
     */
    const play = useCallback(async function (items: ArrayBuffer[]) {

        // Get videos
        const videos = container.current.querySelectorAll("video")

        // Last video
        const lastVideo = videos[videos.length - 1]

        // Check last video has end
        if (lastVideo && !lastVideo.ended) return

        // Revoke prev videos
        for (const video of videos) URL.revokeObjectURL(video.src)

        // Create video
        const video = document.createElement("video")

        // Create blob
        const blob = new Blob([webmHeaderBuffer, ...items], { type: "video/webm" })

        // Set video source
        video.src = URL.createObjectURL(blob)

        // Set current time
        video.currentTime = 9999999

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

function base64ToArrayBuffer(base64: string) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

const webmHeaderBuffer = base64ToArrayBuffer(webmHeader)