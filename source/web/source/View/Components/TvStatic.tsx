import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import React from "react"

/**
 * Tv static component
 * 
 * @returns 
 */
export default function ({ ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    /**
     * Container
     * 
     */
    return <Container {...props} />
}

/**
 * Container
 * 
 */
const Container = styled.div`
    width: 500px;
    height: 300px;
    margin: auto;
    background-image: repeating-conic-gradient(white, black 0.00085%);
    animation: ${keyframes`

        from {
            background-size: 100% 100%;
        }

        to {
            background-size: 200% 200%;
        }
        
    `} 25s linear infinite;
`