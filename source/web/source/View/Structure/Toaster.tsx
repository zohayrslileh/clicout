import { Toaster } from "react-hot-toast"

/**
 * Toaster
 * 
 * @returns 
 */
export default function () {

    return <Toaster toastOptions={{
        style: {
            maxWidth: "calc(100vw - 100px)",
            textOverflow: "ellipsis"
        }
    }} />
}