import Attack from "@/Core/Attack"
import config from "@/config"

/**
 * Video
 * 
 * @returns
 */
export default function ({ attack }: Props) {

    return <video autoPlay>
        <source src={`${config.DEV_SERVER}stream/${attack.id}`} type="video/webm" />
        Your browser does not support the video tag.
    </video>
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}
