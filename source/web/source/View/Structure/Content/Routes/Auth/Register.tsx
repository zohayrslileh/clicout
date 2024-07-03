import { Button, Card, Checkbox, Input } from "@nextui-org/react"
import { Lang, useLang } from "@/Tools/Language"
import { useScreen } from "@/Tools/Screen"
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
     * Screen
     * 
     */
    const screen = useScreen(1000)

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

    return <Card className="m-auto grid gap-2 smooth" style={{ gridTemplateColumns: screen ? "500px auto" : "auto" }}>
        {screen && <Hero />}
        <div className="grid p-7 py-[50px] gap-10 w-[450px]">
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