import Authorization from "@/Models/Authorization"
import { Button } from "@nextui-org/react"
import Appearance from "@/View/Appearance"
import Card from "@/View/Components/Card"
import { useCallback } from "react"
import User from "@/Core/User"

/**
 * Upgrade
 * 
 * @returns 
 */
export default function () {

    /**
     * User
     * 
     */
    const user = User.useContext()

    /**
     * Controller
     * 
     */
    const controller = User.useController()

    /**
     * Logout method
     * 
     * @returns
     */
    const logout = useCallback(function () {

        // Clear Authorization
        Authorization.update("")

        // Dispatch user
        controller.dispatch(undefined)

    }, [])

    return (
        <div className="container grid m-auto justify-items-center">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4">
                    <div className="text-center mx-auto mb-10 mt-5 max-w-[510px]">
                        <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                            Our Pricing Plan
                        </h2>
                        <p className="text-base text-body-color">
                            Hi, <b className="text-success">{user.username}</b> 👋. Please choose the plan that suits you.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center -mx-4 smooth xl:max-w-[90%] m-auto">
                <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                    <Card className="grid py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 mb-10">
                        <span className="text-primary font-semibold text-lg block mb-4">
                            Personal
                        </span>
                        <h2 className="font-bold text-dark mb-5 text-[42px]">
                            $59
                            <span className="text-base text-body-color font-medium">
                                / month
                            </span>
                        </h2>
                        <p className="text-base text-body-color pb-8 border-b border-foreground border-opacity-20" style={{ fontFamily: Appearance.schema.FONT_LIGHT }}>
                            Perfect for using in a personal website or a client project.
                        </p>
                        <ul className="my-7 space-y-5" role="list">
                            <li className="flex items-center">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    2 team members
                                </span>
                            </li>
                            <li className="flex">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    20GB Cloud storage
                                </span>
                            </li>
                            <li className="flex">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    Integration help
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    Sketch Files
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    API Access
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    Complete documentation
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    24×7 phone &amp; email support
                                </span>
                            </li>
                        </ul>
                        <Button size="lg" color="primary">Choose Professional</Button>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                    <Card className="grid py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 mb-10">
                        <span className="text-primary font-semibold text-lg block mb-4">
                            Business
                        </span>
                        <h2 className="font-bold text-dark mb-5 text-[42px]">
                            $199
                            <span className="text-base text-body-color font-medium">
                                / month
                            </span>
                        </h2>
                        <p className="text-base text-body-color pb-8 border-b border-foreground border-opacity-20" style={{ fontFamily: Appearance.schema.FONT_LIGHT }}>
                            Perfect for using in a Business website or a client project.
                        </p>
                        <ul className="my-7 space-y-5" role="list">
                            <li className="flex items-center">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    2 team members
                                </span>
                            </li>
                            <li className="flex">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    20GB Cloud storage
                                </span>
                            </li>
                            <li className="flex">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    Integration help
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    Sketch Files
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    API Access
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    Complete documentation
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    24×7 phone &amp; email support
                                </span>
                            </li>
                        </ul>
                        <Button size="lg" color="primary">Choose Professional</Button>
                    </Card>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                    <Card className="grid py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 mb-10">
                        <span className="text-primary font-semibold text-lg block mb-4">
                            Professional
                        </span>
                        <h2 className="font-bold text-dark mb-5 text-[42px]">
                            $256
                            <span className="text-base text-body-color font-medium">
                                / month
                            </span>
                        </h2>
                        <p className="text-base text-body-color pb-8 border-b border-foreground border-opacity-20" style={{ fontFamily: Appearance.schema.FONT_LIGHT }}>
                            Perfect for using in a Professional website or a client project.
                        </p>
                        <ul className="my-7 space-y-5" role="list">
                            <li className="flex items-center">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    2 team members
                                </span>
                            </li>
                            <li className="flex">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    20GB Cloud storage
                                </span>
                            </li>
                            <li className="flex">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-blue-500 text-blue-700"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500 dark:text-gray-400">
                                    Integration help
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    Sketch Files
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    API Access
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    Complete documentation
                                </span>
                            </li>
                            <li className="flex decoration-gray-500 line-through">
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 h-4 w-4 dark:text-gray-500 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="font-normal leading-tight ms-3 text-base text-gray-500">
                                    24×7 phone &amp; email support
                                </span>
                            </li>
                        </ul>
                        <Button size="lg" color="primary">Choose Professional</Button>
                    </Card>
                </div>
            </div>
            <Button className="m-auto text-medium" variant="light" onClick={logout}>Logout</Button>
        </div>
    )
}