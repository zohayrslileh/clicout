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
    const { value, update } = useForm(() => new RegisterForm)

    /**
     * Register promise
     * 
     */
    const register = usePromise(async () => controller.dispatch(await User.create(value)))

    /**
     * Register Exception
     * 
     */
    const registerException = useMemo(() => register.exception ? compiler(register.exception.current) : undefined, [register.exception])

    /**
     * register issues
     * 
     */
    const registerIssues = useMemo(() => createIssues(registerException instanceof UnprocessableEntity ? registerException.issues : []), [registerException, value])

    return <Card className="m-auto grid gap-2 smooth" style={{ gridTemplateColumns: screen ? "500px auto" : "auto" }}>
        {screen && <Hero />}
        <div className="grid p-7 py-[50px] gap-10 w-[450px]">
            <Logo className="m-auto" width="200px" />
            <Form className="grid gap-3" onSubmit={register.safeExecute}>
                {!registerIssues.length && registerException && <ErrorCard message={registerException.message} />}
                <Input type="email" label={lang("Email")} value={value.email} onValueChange={update.email} variant="bordered" isInvalid={registerIssues.has("email")} errorMessage={registerIssues.path("email").message} />
                <Input label={lang("Username")} value={value.username} onValueChange={update.username} variant="bordered" />
                <Input type="password" label={lang("Password")} value={value.password} onValueChange={update.password} variant="bordered" />
                <Checkbox isSelected={value.agreeTerms} onValueChange={update.agreeTerms}><p className="text-sm">I agree to the terms and conditions? <Link to="../register" className="text-primary">Terms and conditions</Link></p></Checkbox>
                <Button type={register.pending ? "button" : "submit"} size="lg" color="primary" isLoading={register.pending}><Lang>Sign up</Lang></Button>
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