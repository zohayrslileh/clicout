import styled from "@emotion/styled"
import React from "react"

/**
 * Search input
 * 
 * @returns 
 */
export default function ({ children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    /**
     * Container
     * 
     */
    return <Container {...props}>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
`