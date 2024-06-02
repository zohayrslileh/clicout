import manager from "@/Models/Server/Socket"
import styled from "@emotion/styled"
import { useRef } from "react"

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
    const buffers = stream.useStore<ArrayBuffer>("data", 100)

    return <Container>
        <video ref={video} controls />
        <button onClick={() => console.log(buffers)}>Buffers</button>
        <button onClick={() => console.log(URL.createObjectURL(new Blob(buffers, { type: "video/webm" })))}>Blob</button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`