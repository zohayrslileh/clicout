import UnprocessableEntity from "@/View/Exception/Exceptions/UnprocessableEntity"
import { Button, Checkbox, Input } from "@nextui-org/react"
import ErrorCard from "@/View/Components/ErrorCard"
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
     * User controller
     * 
     */
    const userController = User.useController()

    /**
     * Register form
     * 
     */
    const registerForm = useForm(() => new RegisterForm)

    /**
     * Register promise
     * 
     */
    const registerPromise = usePromise(async () => userController.dispatch(await User.create(registerForm.value)))

    /**
     * Register exception
     * 
     */
    const registerException = useMemo(() => registerPromise.exception ? compiler(registerPromise.exception.current) : undefined, [registerPromise.exception])

    /**
     * Register issues
     * 
     */
    const registerIssues = useMemo(() => createIssues(registerException instanceof UnprocessableEntity ? registerException.issues : []), [registerException])

    /**
     * On register form change
     * 
     */
    useEffect(function () {

        if (registerPromise.exception) registerPromise.reset()

    }, [registerForm.value])

    return <Card className="m-auto grid gap-2 smooth" style={{ gridTemplateColumns: screen ? "500px auto" : "auto" }}>
        {screen && <Hero />}
        <div className="grid p-7 py-[45px] gap-10 w-[450px]">
            <Logo className="m-auto" width="220px" />
            <Form className="grid gap-3" onSubmit={registerPromise.safeExecute}>
                {!registerIssues.length && registerException && <ErrorCard message={lang(registerException.message)} />}
                <Input type="email" label={lang("Email")} value={registerForm.value.email || ""} onValueChange={email => registerForm.update.email(email || undefined)} variant="bordered" isInvalid={registerIssues.has("email")} errorMessage={lang(registerIssues.path("email").message || "")} />
                <Input label={lang("Username")} value={registerForm.value.username || ""} onValueChange={username => registerForm.update.username(username || undefined)} variant="bordered" isInvalid={registerIssues.has("username")} errorMessage={lang(registerIssues.path("username").message || "")} />
                <Input type="password" label={lang("Password")} value={registerForm.value.password || ""} onValueChange={password => registerForm.update.password(password || undefined)} variant="bordered" isInvalid={registerIssues.has("password")} errorMessage={lang(registerIssues.path("password").message || "")} />
                <Checkbox isSelected={registerForm.value.agreeTerms} onValueChange={registerForm.update.agreeTerms} isInvalid={registerIssues.has("agreeTerms")}><p className="text-sm"><Lang>I agree to the terms and conditions</Lang>? <Link to="../register" className="text-primary"><Lang>Terms and conditions</Lang></Link></p></Checkbox>
                <Button onClick={registerPromise.safeExecute} type={registerPromise.pending ? "button" : "submit"} size="lg" color="primary" isLoading={registerPromise.pending}><Lang>Sign up</Lang></Button>
            </Form>
            <p className="m-auto"><Lang>I already have an account</Lang>? <Link to="../login" className="text-primary"><Lang>Sign in</Lang></Link></p>
        </div>
    </Card>
}

/**
 * Register Form
 * 
 */
class RegisterForm {

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