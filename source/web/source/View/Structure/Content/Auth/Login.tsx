import TextInput from "@/View/Components/TextInput"
import ErrorCard from "@/View/Components/ErrorCard"
import compiler from "@/View/Exception/compiler"
import { Lang, useLang } from "@/Tools/Language"
import Button from "@/View/Components/Button"
import useForm, { Form } from "@/Tools/Form"
import { Navigate } from "react-router-dom"
import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import User from "@/Core/User"

/**
 * Login
 * 
 * @returns 
 */
export default function () {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    /**
     * Form
     * 
     */
    const { value, update } = useForm(() => new LoginForm)

    /**
     * Login
     * 
     */
    const login = usePromise(async () => await User.login(value))

    /**
     * Error
     * 
     */
    const error = login.exception ? compiler(login.exception.current) : undefined

    // Solve status
    if (login.solve) return <Navigate to="/" />

    return <Container>

        <Logo width={200} id="logo" />

        {error ? <ErrorCard message={error.message} /> : undefined}

        <Form onSubmit={login.execute}>
            <TextInput placeholder={lang("Username")} type="text" value={value.username || ""} onChange={value => update.username(value || undefined)} />
            <TextInput placeholder={lang("Password")} type="password" value={value.password || ""} onChange={value => update.password(value || undefined)} />
            <Button disabled={login.pending}><Lang>Login</Lang></Button>
        </Form>

    </Container>
}

/**
 * Login Form
 * 
 */
class LoginForm {

    /**
     * Username
     * 
     */
    username: string | undefined

    /**
     * Password
     * 
     */
    password: string | undefined
}

/**
 * Container
 * 
 */
const Container = styled(Card)`
    width: fit-content;
    margin: auto;
    width: 320px;
    padding: 20px;
    display: grid;
    gap: 10px;

    > #logo {
        margin-inline: auto;
        margin-block: 25px;
        display: flex;
    }

    > form {
        display: grid;
        gap: 10px;
    }
`