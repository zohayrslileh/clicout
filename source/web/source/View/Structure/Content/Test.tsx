import manager from "@/Models/Server/Socket"
import { useEffect, useRef } from "react"
import styled from "@emotion/styled"

/**
 * Test
 * 
 * @returns 
 */
export default function () {

    /**
     * Video
     * 
     */
    const video = useRef<HTMLVideoElement | null>(null)

    /**
     * Stream
     * 
     */
    const stream = manager.useNamespace("/main")

    /**
     * Connected
     * 
     */
    stream.useConnected()

    /**
     * Before Effect
     * 
     */
    useEffect(function () {

        // Check video
        if (!video.current) throw new Error("Vedio tag was not found")

        // Create media source
        const mediaSource = new MediaSource()

        // Set vedio source
        video.current.src = URL.createObjectURL(mediaSource)

        // On source open
        mediaSource.addEventListener("sourceopen", function () {

            // Source buffer
            const sourceBuffer = mediaSource.addSourceBuffer(`video/mp4; codecs="avc1.42E01E, mp4a.40.2"`)

            // On data
            stream.socket.on("data", function (data: ArrayBuffer) {

                // Append to source buffer
                sourceBuffer.appendBuffer(new Uint8Array(data))
            })
        })

    }, [])

    return <Container>
        <video ref={video} controls />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`