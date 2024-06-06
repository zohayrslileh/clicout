import { keyframes } from "@emotion/react"
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
        <div className="layer1">
            <div className="tv-static animation1"></div>
        </div>
        <div className="layer2">
            <div className="tv-static animation2"></div>
        </div>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;

    .layer1 {
        width: 100%;
        background-color: rgba(255, 255, 255, 0.5);
    }

    .layer2 {
        width: 100%;
        margin-left: -100%;
        background-color: rgba(255, 255, 255, 0.5);
    }

    .tv-static {
        width: 100%;
        height: 100%;
        margin: auto;
        background-image: repeating-radial-gradient(circle at 17% 32%, white, black 0.00085px);
    }

    .animation1 {
        animation: ${keyframes`

            from {
                background-size: 100% 100%;
            } 

            to {
                background-size: 99% 100%;
            }

        `} 1s linear infinite;
    }

    .animation2 {
        animation: ${keyframes`

            from {
                background-size: 48.56% 50%;
            }

            to {
                background-size: 43.9% 50.1%;
            }
      
        `} 0.1s linear infinite;
    }
`