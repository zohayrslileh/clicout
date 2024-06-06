import { keyframes } from "@emotion/react"
import noice from "@/View/Media/noise.png"
import styled from "@emotion/styled"
import React from "react"

/**
 * Tv static component
 * 
 * @returns 
 */
export default function ({ children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    /**
     * Container
     * 
     */
    return <Container {...props}>
        <div className="fuzzy-overlay" />
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    mix-blend-mode: hard-light;

    .fuzzy-overlay {
        position: absolute;
        inset: -200%;
        background-image: url(${noice});
        opacity: 30%;
        z-index: 0;
        animation: ${keyframes`

            0% {
                transform: translateX(10%) translateY(10%);
            }

            100% {
                transform: translateX(-10%) translateY(-10%);
            }
            
        `} 0.2s linear infinite both;
    }
`