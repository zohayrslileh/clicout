import toast, { Toaster, useToasterStore } from "react-hot-toast"
import { useEffect } from "react"

/**
 * Toaster
 * 
 * @returns 
 */
export default function () {

    /**
    * Toasts store
    * 
    */
    const { toasts } = useToasterStore()

    /**
     * Limit toasts
     * 
     */
    const TOAST_LIMIT = 3

    /**
     * On change toasts
     * 
     */
    useEffect(() => {

        toasts.filter((t, i) => t.visible && i >= TOAST_LIMIT && toast.dismiss(t.id))

    }, [toasts])

    return <Toaster toastOptions={{
        style: {
            maxWidth: "calc(100vw - 100px)",
            textOverflow: "ellipsis"
        }
    }} />
}