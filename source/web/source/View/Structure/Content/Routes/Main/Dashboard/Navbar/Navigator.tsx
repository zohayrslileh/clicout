import { IoIosArrowBack, IoIosArrowForward, IoIosRefresh } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { Button } from "@nextui-org/react"
import Language from "@/View/Language"
import styled from "@emotion/styled"

/**
 * Navigator
 * 
 * @returns 
 */
export default function () {

    /**
     * Navigate
     * 
     */
    const navigate = useNavigate()

    return (
        <Container>
            <Button onClick={() => navigate(-1)}>{Language.value.direction === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}</Button>
            <Button onClick={() => navigate(1)}>{Language.value.direction === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}</Button>
            <Button onClick={() => location.reload()}><IoIosRefresh /></Button>
        </Container>
    )
}

/**
 * Container
 * 
 */
const Container = styled.div`
    display: flex;
    gap: 10px;
`