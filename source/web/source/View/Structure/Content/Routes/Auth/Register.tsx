import UnprocessableEntity from "@/View/Exception/Exceptions/UnprocessableEntity"
import { Button, Card, Checkbox, Input } from "@nextui-org/react"
import ErrorCard from "@/View/Components/ErrorCard"
import compiler from "@/View/Exception/compiler"
import { Lang, useLang } from "@/Tools/Language"
import { createIssues } from "@/Tools/Validator"
import useForm, { Form } from "@/Tools/Form"
import { useScreen } from "@/Tools/Screen"
import Logo from "@/View/Components/Logo"
import usePromise from "@/Tools/Promise"
import { Link } from "react-router-dom"
import { useMemo } from "react"
import User from "@/Core/User"
import Hero from "./Hero"

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
     * Screen
     * 
     */
    const screen = useScreen(1000)

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
     * Login promise
     * 
     */
    const login = usePromise(async () => await User.create(value))

    /**
     * Login Exception
     * 
     */
    const loginException = useMemo(() => login.exception ? compiler(login.exception.current) : undefined, [login.exception])

    /**
     * login issues
     * 
     */
    const loginIssues = useMemo(() => createIssues(loginException instanceof UnprocessableEntity ? loginException.issues : []), [loginException])

    return <Card className="m-auto grid gap-2 smooth" style={{ gridTemplateColumns: screen ? "500px auto" : "auto" }}>
        {screen && <Hero />}
        <div className="grid p-7 py-[50px] gap-10 w-[450px]">
            <Logo className="m-auto" width="200px" />
            <Form className="grid gap-3" onSubmit={login.safeExecute}>
                {!loginIssues.length && loginException && <ErrorCard message={loginException.message} />}
                <Input type="email" label={lang("Email")} value={value.email} onValueChange={update.email} />
                <Input label={lang("Username")} value={value.username} onValueChange={update.username} />
                <Input type="password" label={lang("Password")} value={value.password} onValueChange={update.password} />
                <Checkbox checked={value.agreeTerms} onChange={event => update.agreeTerms(event.target.checked)} ><p className="text-sm">I agree to the terms and conditions? <Link to="../login" className="text-primary">Terms and conditions</Link></p></Checkbox>
                <Button type={login.pending ? "button" : "submit"} size="lg" color="primary" isLoading={login.pending}><Lang>Sign up</Lang></Button>
            </Form>
            <p className="m-auto">I already have an account? <Link to="../login" className="text-primary">Sign in</Link></p>
        </div>
    </Card>
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