import { Button, Card, Image, Input } from "@nextui-org/react"
import { Lang, useLang } from "@/Tools/Language"
import Logo from "@/View/Components/Logo"
import { Link } from "react-router-dom"
import { Form } from "@/Tools/Form"

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

    return <Card className="m-auto p-7 grid grid-cols-2 gap-2">
        <Image className="h-[400px] w-[400px]" src="https://www.tailwindtap.com/assets/components/form/createaccount/login.svg" alt="Auth Hero" />
        <div className="grid p-7 gap-10">
            <Logo className="m-auto" width="200px" />
            <Form className="grid gap-3">
                <Input label={lang("Username")} />
                <Input type="password" label={lang("Password")} />
                <Button size="lg" color="primary"><Lang>Login</Lang></Button>
            </Form>
            <p className="m-auto">Need an account? <Link to="../register" className="text-primary">Sign up</Link></p>
        </div>
    </Card>
}