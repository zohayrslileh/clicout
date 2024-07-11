import Attack from "@/Core/Attack"
import config from "@/config"

/**
 * Video
 * 
 * @returns
 */
export default function ({ attack }: Props) {

    return <video autoPlay>
        <source src={`${config.DEV_SERVER}stream/${attack.id}`} />
        Your browser does not support HTML video.
    </video>
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}
