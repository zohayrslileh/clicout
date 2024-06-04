import UnprocessableEntity from "@/View/Exception/Exceptions/UnprocessableEntity"
import LinkButton from "@/View/Components/LinkButton"
import TextInput from "@/View/Components/TextInput"
import compiler from "@/View/Exception/compiler"
import { Lang, useLang } from "@/Tools/Language"
import { createIssues } from "@/Tools/Validator"
import Button from "@/View/Components/Button"
import useForm, { Form } from "@/Tools/Form"
import { Navigate } from "react-router-dom"
import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import usePromise from "@/Tools/Promise"
import styled from "@emotion/styled"
import { useMemo } from "react"
import User from "@/Core/User"

/**
 * Register
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

    /**
     * Issues
     * 
     */
    const issues = useMemo(() => createIssues(error instanceof UnprocessableEntity ? error.issues : []), [login.exception])

    // Solve status
    if (login.solve) return <Navigate to="/" />

    return <Container>

        <Logo width={200} id="logo" />

        {error && !issues.length ? error.view() : undefined}

        <Form onSubmit={login.execute}>
            <TextInput placeholder={lang("Username")} issue={issues.has("username")} type="text" value={value.username || ""} onChange={value => update.username(value || undefined)} />
            <TextInput placeholder={lang("Password")} issue={issues.has("password")} type="password" value={value.password || ""} onChange={value => update.password(value || undefined)} />
            <Button disabled={login.pending}><Lang>Login</Lang></Button>
        </Form>
        
        <LinkButton to=".."><Lang>Login</Lang></LinkButton>

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
    text-align: center;

    > #logo {
        margin-inline: auto;
        margin-block: 25px;
        display: flex;
    }

    > form {
        display: grid;
        gap: 10px;
    }

    > a {
        margin-top: 10px;
    }
`