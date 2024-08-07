import UnprocessableEntity from "@/View/Exception/Exceptions/UnprocessableEntity"
import ErrorCard from "@/View/Components/ErrorCard"
import { Button, Input } from "@nextui-org/react"
import compiler from "@/View/Exception/compiler"
import { createIssues } from "@/Tools/Validator"
import { Lang, useLang } from "@/Tools/Language"
import useForm, { Form } from "@/Tools/Form"
import { useEffect, useMemo } from "react"
import { useScreen } from "@/Tools/Screen"
import Logo from "@/View/Components/Logo"
import Card from "@/View/Components/Card"
import usePromise from "@/Tools/Promise"
import { Link } from "react-router-dom"
import User from "@/Core/User"
import Hero from "./Hero"

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
     * Screen
     * 
     */
    const screen = useScreen(1000)

    /**
     * User controller
     * 
     */
    const userController = User.useController()

    /**
     * Login form
     * 
     */
    const loginForm = useForm(() => new LoginForm)

    /**
     * Login promise
     * 
     */
    const loginPromise = usePromise(async () => userController.dispatch(await User.login(loginForm.value)))

    /**
     * Login exception
     * 
     */
    const loginException = useMemo(() => loginPromise.exception ? compiler(loginPromise.exception.current) : undefined, [loginPromise.exception])

    /**
     * Login issues
     * 
     */
    const loginIssues = useMemo(() => createIssues(loginException instanceof UnprocessableEntity ? loginException.issues : []), [loginException])

    /**
     * On login form change
     * 
     */
    useEffect(function () {

        if (loginPromise.exception) loginPromise.reset()

    }, [loginForm.value])

    return <Card className="m-auto grid gap-2 smooth" style={{ gridTemplateColumns: screen ? "500px auto" : "auto" }}>
        {screen && <Hero />}
        <div className="grid p-7 py-[45px] gap-10 w-[450px]">
            <Logo className="m-auto" width="220px" />
            <Form className="grid gap-3" onSubmit={loginPromise.safeExecute}>
                {!loginIssues.length && loginException && <ErrorCard message={lang(loginException.message)} />}
                <Input label={lang("Username")} value={loginForm.value.username || ""} onValueChange={username => loginForm.update.username(username || undefined)} variant="bordered" isInvalid={loginIssues.has("username")} errorMessage={lang(loginIssues.path("username").message || "")} />
                <Input type="password" label={lang("Password")} value={loginForm.value.password || ""} onValueChange={password => loginForm.update.password(password || undefined)} variant="bordered" isInvalid={loginIssues.has("password")} errorMessage={lang(loginIssues.path("password").message || "")} />
                <Button onClick={loginPromise.safeExecute} type={loginPromise.pending ? "button" : "submit"} size="lg" color="primary" isLoading={loginPromise.pending}><Lang>Sign in</Lang></Button>
            </Form>
            <p className="m-auto"><Lang>Need an account</Lang>? <Link to="../register" className="text-primary"><Lang>Sign up</Lang></Link></p>
        </div>
    </Card>
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