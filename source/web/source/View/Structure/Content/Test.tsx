import manager from "@/Models/Server/Socket"
import styled from "@emotion/styled"

/**
 * Test
 * 
 * @returns 
 */
export default function () {

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
     * Data
     * 
     */
    const data = stream.useState<string>("data")

    console.log(data)

    return <Container>
        You have new data
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`