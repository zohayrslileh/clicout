import Json from "@/Tools/Json"
import axios from "axios"

interface Product {
    title: string
    description: string
    price: number
    imageURL: string
}

interface Subcategory {
    name: string
    products: Product[]
}

interface Category {
    name: string
    subcategories: Subcategory[]
}

interface Supermarket {
    name: string
    address: string
    phoneNumber: string
    categories: Category[]
}

const Authorization = "eyJraWQiOiJvbGQiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE3MjE0MTI5NzMsImlzcyI6ImF1dGgiLCJleHAiOjE3MjE0MTQxNzMsInJvbGUiOiJBQ0NFU1MiLCJwYXlsb2FkIjoie1widXNlclJvbGVcIjpcIkNVU1RPTUVSXCIsXCJpc1N0YWZmXCI6ZmFsc2UsXCJwZXJtaXNzaW9uR3JvdXBzXCI6W10sXCJjaXR5R3JvdXBzXCI6W10sXCJ1c2VySWRcIjoxNzM1Mzc4NjcsXCJkZXZpY2VJZFwiOjIxMDgxODQwNjEsXCJncmFudFR5cGVcIjpcIlBBU1NXT1JEXCJ9IiwidmVyc2lvbiI6IlYyIiwianRpIjoiZjM3M2I3YWYtZTMyOS00MjFjLTlmODUtMDVhODAyMzc0ZjI0In0.NpB0SOerZW77OiWcTXuFplc-61Wci8JLWbEGxICCzVlf03AckqzxCLgGK_UF26eqVfliY4305g9UuVkoM3-6eLJDCSy5ccAweXa0-e52eGucwH_QO6vRa45BcQxrULukokqMYhL4ZlYNWBy_enLtHCd31Yu0IyDQ4wOiZat4TceRoJ_YyHGJygyi-lZJPbSnD5qPVFfK2ftWZ9dSITc4JVCTmFGsAzSEraJyN6jjFDngZUvWsep9rMa9FdsLj6aY0_8R2-yDVVefEIVX6g96ORYc1sNstyB8VHTaTCqE3Jppr8Qe0W6jMl7OwPM752ehuQB9fniub06BNDzBxvhgYg"

const instance = axios.create({
    baseURL: "https://api.glovoapp.com/",
    headers: {
        "Authorization": Authorization,
        "Glovo-Location-City-Code": "MAR"
    }
})

async function fetchSupermarkets() {

    const supermarkets: Supermarket[] = []

    const response = await instance.get("v3/feeds/categories/4")

    for (const primativeSupermarket of response.data.elements) {

        supermarkets.push(primativeSupermarket)
    }

    return supermarkets
}

export default async function () {

    new Json("storage/supermarkets.json").update(await fetchSupermarkets())
}