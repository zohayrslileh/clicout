import { Button, Card, Checkbox, Input } from "@nextui-org/react"
import { Lang, useLang } from "@/Tools/Language"
import Logo from "@/View/Components/Logo"
import usePromise from "@/Tools/Promise"
import { Link } from "react-router-dom"
import { Form } from "@/Tools/Form"
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
     * Login promise
     * 
     */
    const login = usePromise(async function () {

        await new Promise(resolve => setTimeout(resolve, 2000))
    })

    return <Card className="m-auto grid grid-cols-[500px_450px] gap-2 smooth">
        <Hero />
        <div className="grid p-7 py-[60px] gap-10">
            <Logo className="m-auto" width="200px" />
            <Form className="grid gap-3" onSubmit={login.safeExecute}>
                <Input type="email" label={lang("Email")} />
                <Input label={lang("Username")} />
                <Input type="password" label={lang("Password")} />
                <Checkbox><p className="text-sm">I agree to the terms and conditions? <Link to="../login" className="text-primary">Terms and conditions</Link></p></Checkbox>
                <Button type={login.pending ? "button" : "submit"} size="lg" color="primary" isLoading={login.pending}><Lang>Sign up</Lang></Button>
            </Form>
            <p className="m-auto">I already have an account? <Link to="../login" className="text-primary">Sign in</Link></p>
        </div>
    </Card>
}