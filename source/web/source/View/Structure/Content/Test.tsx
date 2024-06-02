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
     * Buffers
     * 
     */
    const buffers = useRef<ArrayBuffer[]>([])

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
     * End
     * 
     */
    const end = stream.useState<boolean>("end")

    /**
     * on data
     * 
     */
    stream.useOn("data", (data: ArrayBuffer) => buffers.current.push(data))

    /**
     * Play method
     * 
     */
    const play = useCallback(function (startTime: number) {

        if (!video.current) throw Error("Vedio tag was not found")

        const vedioTag = video.current

        vedioTag.src = URL.createObjectURL(new Blob(buffers.current, { type: "video/mp4" }))

        vedioTag.onended = async function () {

            const startTime = vedioTag.currentTime

            URL.revokeObjectURL(vedioTag.src)

            await new Promise(resolve => setTimeout(resolve, 1000))

            if (!end) play(startTime)
        }

        vedioTag.currentTime = startTime

        vedioTag.play()

    }, [])

    return <Container>
        <video ref={video} />
        <button onClick={() => play(0)}>Play</button>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`