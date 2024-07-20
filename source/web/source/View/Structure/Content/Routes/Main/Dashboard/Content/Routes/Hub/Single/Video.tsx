import Attack from "@/Core/Attack"

/**
 * Video
 * 
 * @returns
 */
export default function () {

    /**
     * Attack
     * 
     */
    const attack = Attack.useContext()

    return <div>{attack.id}</div>
}