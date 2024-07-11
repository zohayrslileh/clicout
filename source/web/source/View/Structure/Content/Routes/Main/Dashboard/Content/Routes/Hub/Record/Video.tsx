import Attack from "@/Core/Attack"
import { useRef } from "react"
import config from "@/config"

/**
 * Video
 * 
 * @returns
 */
export default function ({ attack }: Props) {

    const video = useRef<HTMLVideoElement>(undefined!)

    return <video ref={video} src={`${config.DEV_SERVER}stream/${attack.id}`} controls autoPlay />
}

/**
 * Props
 * 
 */
interface Props {
    attack: Attack
}
