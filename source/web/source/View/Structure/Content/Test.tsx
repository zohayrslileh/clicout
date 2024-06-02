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

        video.current.src = URL.createObjectURL(new Blob(buffers, { type: "video/webm" }))

        video.current.play()

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