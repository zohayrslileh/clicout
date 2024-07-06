import { FaTelegramPlane } from "react-icons/fa"
import { Button } from "@nextui-org/react"
import { Lang } from "@/Tools/Language"
import { Link } from "react-router-dom"
import config from "@/config"

/**
 * Contact
 * 
 * @returns 
 */
export default function () {

    return <Button
        className="m-10 bg-[#0088cc] text-white"
        color="success"
        as={Link}
        to={config.TELEGRAM_CONTACT}
        target="_blank"
        startContent={<FaTelegramPlane />}
        endContent={<p className="text-small text-success-600 font-medium">(<Lang>Online</Lang>)</p>}>
        <Lang>Contact</Lang>
    </Button>
}