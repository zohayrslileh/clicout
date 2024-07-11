import Attack from "@/Core/Attack"
import config from "@/config"

/**
 * Video
 * 
 * @returns
 */
export default function ({ attack }: Props) {

    return <video src={`${config.DEV_SERVER}stream/${attack.id}`} controls autoPlay />
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}
