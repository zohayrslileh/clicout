import { Lang } from "@/Tools/Language"
import User from "@/Core/User"

/**
 * Header
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = User.useContext()

    return (
        <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
                <div className="text-center mx-auto max-w-[510px]">
                    <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                        <Lang>Our Pricing Plan</Lang>
                    </h2>
                    <p className="text-base text-body-color">
                        <Lang>Hi</Lang>, <b className="text-success">{user.username}</b> 👋. <Lang>Please choose the plan that suits you</Lang>.
                    </p>
                </div>
            </div>
        </div>
    )
}