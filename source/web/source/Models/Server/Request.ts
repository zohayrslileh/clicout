import Authorization from "@/Models/Authorization"
import axios, { AxiosRequestConfig } from "axios"
import config from "@/config"

/*
|-----------------------------
|  BASE_SERVER_URL
|-----------------------------
|
|
*/
export const BASE_SERVER_URL = import.meta.env.DEV ? config.DEV_SERVER : "/"

/*
|-----------------------------
|  Create instance
|-----------------------------
|
|
*/
export const createInstance = () => axios.create({
    baseURL: BASE_SERVER_URL + "api",
    timeout: 30000,
    headers: {
        "Authorization": Authorization.value
    }
})

/**
 * Request method
 * 
 * @returns 
 */
export default async function request<Body>(requestConfig: AxiosRequestConfig) {

    // Instance
    const instance = createInstance()

    // Ask response
    const response = await instance<Body>(requestConfig)

    return response.data
}