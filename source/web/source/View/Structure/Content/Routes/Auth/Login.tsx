import UnprocessableEntity from "@/View/Exception/Exceptions/UnprocessableEntity"
import LinkButton from "@/View/Components/LinkButton"
import TextInput from "@/View/Components/TextInput"
import compiler from "@/View/Exception/compiler"
import { Lang, useLang } from "@/Tools/Language"
import { createIssues } from "@/Tools/Validator"
import Button from "@/View/Components/Button"
import useForm, { Form } from "@/Tools/Form"
import Card from "@/View/Components/Card"
import Logo from "@/View/Components/Logo"
import { Fragment, useMemo } from "react"
import usePromise from "@/Tools/Promise"
import { Update } from "@/Tools/Updater"
import styled from "@emotion/styled"
import User from "@/Core/User"

/**
 * Login
 * 
 * @returns 
 */
export default function ({ onSuccess }: Props) {

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
    const login = usePromise(async () => onSuccess(await User.login(value)))

    /**
     * View exception
     * 
     */
    const viewException = useMemo(() => login.exception ? compiler(login.exception.current) : undefined, [login.exception])

    /**
     * Issues
     * 
     */
    const issues = useMemo(() => createIssues(viewException instanceof UnprocessableEntity ? viewException.issues : []), [viewException])

    // Solve status
    if (login.solve) return <Fragment />

    return <Container>

        <Logo width={200} id="logo" />

        {viewException && !issues.length ? viewException.view() : undefined}

        <Form onSubmit={login.safeExecute}>
            <TextInput placeholder={lang("Username")} issue={issues.has("username")} type="text" value={value.username || ""} onChange={value => update.username(value || undefined)} />
            <TextInput placeholder={lang("Password")} issue={issues.has("password")} type="password" value={value.password || ""} onChange={value => update.password(value || undefined)} />
            <Button disabled={login.pending}><Lang>Login</Lang></Button>
        </Form>

        <LinkButton to="../register"><Lang>Create Account</Lang></LinkButton>

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
 * Props
 * 
 */
interface Props {
    onSuccess: Update<User | undefined>
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

    > a {
        margin-top: 10px;
        text-align: center;
    }
`