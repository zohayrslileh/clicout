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
        className="m-10 mt-0 bg-[#0088cc] text-white smooth"
        color="success"
        as={Link}
        to={config.TELEGRAM_CONTACT}
        target="_blank"
        startContent={<FaTelegramPlane />}
    >
        <Lang>Contact on Telegram</Lang>
    </Button>
}