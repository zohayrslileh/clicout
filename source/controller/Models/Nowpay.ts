import axios from "axios"

/*
|-----------------------------
|  Nowpay
|-----------------------------
|
|
*/
export default axios.create({
    baseURL: "https://api.nowpayments.io/v1",
    headers: {
        "x-api-key": process.env.NOW_PAYMENTS_API_KEY
    }
})