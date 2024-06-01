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
     * On data
     * 
     */
    stream.useOn("data", function (buffer: ArrayBuffer) {

        console.log(URL.createObjectURL(new Blob([buffer])))
    })

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