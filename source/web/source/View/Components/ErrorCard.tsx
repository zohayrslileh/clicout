import { BiError } from "react-icons/bi"
import styled from "@emotion/styled"
import Card from "./Card"

/**
 * Error card component
 * 
 * @returns 
 */
export default function ({ message }: Props) {

    return <Container>
        <BiError />
        {message}
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    box-shadow: 0 0 20px inset rgb(179 0 0 / 45%);
    padding: 13px 20px;
    height: fit-content;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;

    > .line {
        opacity: 0.2;
    }

    color: rgb(237 130 130 / 90%);
`

/**
 * Props
 * 
 */
interface Props {
    message: string
}