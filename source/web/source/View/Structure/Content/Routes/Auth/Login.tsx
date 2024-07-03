import { Button, Card, Input } from "@nextui-org/react"
import { Lang, useLang } from "@/Tools/Language"
import { useScreen } from "@/Tools/Screen"
import Logo from "@/View/Components/Logo"
import usePromise from "@/Tools/Promise"
import { Link } from "react-router-dom"
import { Form } from "@/Tools/Form"
import Hero from "./Hero"

/**
 * Login
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

    return <Card className={`m-auto grid grid-cols-[${screen ? "450px_400px" : "400px"}] gap-2 smooth`}>
        {screen && <Hero />}
        <div className="grid p-7 py-[60px] gap-10">
            <Logo className="m-auto" width="200px" />
            <Form className="grid gap-3" onSubmit={login.safeExecute}>
                <Input label={lang("Username")} />
                <Input type="password" label={lang("Password")} />
                <Button type={login.pending ? "button" : "submit"} size="lg" color="primary" isLoading={login.pending}><Lang>Sign in</Lang></Button>
            </Form>
            <p className="m-auto">Need an account? <Link to="../register" className="text-primary">Sign up</Link></p>
        </div>
    </Card>
}