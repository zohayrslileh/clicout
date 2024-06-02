import manager from "@/Models/Server/Socket"
import { useCallback, useRef } from "react"
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
     * Buffers
     * 
     */
    const buffers = stream.useStore<ArrayBuffer>("data", 500)

    /**
     * Play method
     * 
     */
    const play = useCallback(function () {

        if (!video.current) throw Error("Vedio tag was not found")

        const mediaSource = new MediaSource

        video.current.src = URL.createObjectURL(mediaSource)

        mediaSource.addEventListener("sourceopen", async function () {

            const mimeType = `video/mp4; codecs="avc1.42E01E, mp4a.40.2"`

            if (!MediaSource.isTypeSupported(mimeType)) throw new Error("Mimetype not supported")

            const sourceBuffer = mediaSource.addSourceBuffer(mimeType)

            for (const buffer of buffers) {

                await new Promise((resolve, reject) => {
                    sourceBuffer.appendBuffer(buffer)
                    sourceBuffer.addEventListener('updateend', resolve, { once: true })
                    sourceBuffer.addEventListener('error', reject, { once: true })
                })

            }

        })

    }, [buffers])

    return <Container>
        <video ref={video} controls />
        <button onClick={play}>Play</button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`