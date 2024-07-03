import { Button, Card, Checkbox, Input } from "@nextui-org/react"
import ErrorCard from "@/View/Components/ErrorCard"
import compiler from "@/View/Exception/compiler"
import { Lang, useLang } from "@/Tools/Language"
import useForm, { Form } from "@/Tools/Form"
import useValidator from "@/Tools/Validator"
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
     * Register validator
     * 
     */
    const registerValidator = useValidator(zod => zod.object({
        username: zod.string().regex(new RegExp("^[a-z0-9_-]{5,15}$")),
        password: zod.string().min(4).max(16),
        email: zod.string({ required_error: "Email field is required" }).email(),
        agreeTerms: zod.boolean().refine(agreeTerms => agreeTerms)
    }), registerForm.value)

    /**
     * Register promise
     * 
     */
    const registerPromise = usePromise(async function () {

        // Validate data
        const data = registerValidator.validate()

        // Check data
        if (!data) return

        // Create user
        const user = await User.create(data)

        // dispatch user controller
        userController.dispatch(user)
    })

    /**
     * Register exception
     * 
     */
    const registerException = useMemo(() => registerPromise.exception ? compiler(registerPromise.exception.current) : undefined, [registerPromise.exception])

    return <Card className="m-auto grid gap-2 smooth" style={{ gridTemplateColumns: screen ? "500px auto" : "auto" }}>
        {screen && <Hero />}
        <div className="grid p-7 py-[50px] gap-10 w-[450px]">
            <Logo className="m-auto" width="200px" />
            <Form className="grid gap-3" onSubmit={registerPromise.safeExecute}>
                {!registerValidator.issues.length && registerException && <ErrorCard message={registerException.message} />}
                <Input type="email" label={lang("Email")} value={registerForm.value.email} onValueChange={registerForm.update.email} variant="bordered" isInvalid={registerValidator.issues.has("email")} errorMessage={registerValidator.issues.path("email").message} />
                <Input label={lang("Username")} value={registerForm.value.username} onValueChange={registerForm.update.username} variant="bordered" />
                <Input type="password" label={lang("Password")} value={registerForm.value.password} onValueChange={registerForm.update.password} variant="bordered" />
                <Checkbox isSelected={registerForm.value.agreeTerms} onValueChange={registerForm.update.agreeTerms}><p className="text-sm">I agree to the terms and conditions? <Link to="../register" className="text-primary">Terms and conditions</Link></p></Checkbox>
                <Button type={registerPromise.pending ? "button" : "submit"} size="lg" color="primary" isLoading={registerPromise.pending}><Lang>Sign up</Lang></Button>
            </Form>
            <p className="m-auto">I already have an account? <Link to="../register" className="text-primary">Sign in</Link></p>
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