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
    box-shadow: 0 0 20px inset rgb(179 0 0 / 30%);
    padding: 10px 10px;
    height: fit-content;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 10px;

    > .line {
        opacity: 0.1;
    }

    color: rgb(179 0 0 / 90%);
`

/**
 * Props
 * 
 */
interface Props {
    message: string
}