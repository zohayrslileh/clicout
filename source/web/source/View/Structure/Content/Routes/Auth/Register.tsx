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
import Checkbox from "@/View/Components/Checkbox"

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
     * Controller
     * 
     */
    const controller = User.useController()

    /**
     * Form
     * 
     */
    const { value, update } = useForm(() => new LoginForm)

    /**
     * Register
     * 
     */
    const register = usePromise(async () => controller.dispatch(await User.create(value)))

    /**
     * View exception
     * 
     */
    const viewException = useMemo(() => register.exception ? compiler(register.exception.current) : undefined, [register.exception])

    /**
     * Issues
     * 
     */
    const issues = useMemo(() => createIssues(viewException instanceof UnprocessableEntity ? viewException.issues : []), [viewException])

    // Solve status
    if (register.solve) return <Navigate to="/main" />

    return <Container>

        <Logo width={200} id="logo" />

        {viewException && !issues.length ? viewException.view() : undefined}

        <Form onSubmit={register.safeExecute}>
            <TextInput placeholder={lang("Email")} issue={issues.has("email")} type="text" value={value.email || ""} onChange={value => update.email(value || undefined)} />
            <TextInput placeholder={lang("Username")} issue={issues.has("username")} type="text" value={value.username || ""} onChange={value => update.username(value || undefined)} />
            <TextInput placeholder={lang("Password")} issue={issues.has("password")} type="password" value={value.password || ""} onChange={value => update.password(value || undefined)} />
            <label>
                <Checkbox checked={value.agreeTerms} onChange={update.agreeTerms} issue={issues.has("agreeTerms")} />
                <p><Lang>Agree terms</Lang></p>
            </label>
            <Button disabled={register.pending}><Lang>Create Account</Lang></Button>
        </Form>

        <LinkButton to="../login"><Lang>Login</Lang></LinkButton>

    </Container>
}

/**
 * Login Form
 * 
 */
class LoginForm {

    /**
     * Email
     * 
     */
    email: string | undefined

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

    /**
     * Agree terms
     * 
     */
    agreeTerms: boolean = false
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

        > label {
            display: flex;
            align-items: center;
            gap: 10px;

            > p {
                opacity: 0.7;
                margin: 0;
                user-select: none;
                font-size: 13px;
            }
        }
    }

    > a {
        margin-top: 10px;
        text-align: center;
    }
`