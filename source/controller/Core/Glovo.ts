import Json from "@/Tools/Json"
import axios from "axios"

interface Product {
    title: string
    description: string
    price: number
    imageURL: string
}

interface Category {
    name: string
    subcategories?: Category[]
    products?: Product[]
}

interface Supermarket {
    name: string
    address: string
    phoneNumber: string
    categories: Category[]
}

const Authorization = "eyJraWQiOiJvbGQiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE3MjE0MTcxMjgsImlzcyI6ImF1dGgiLCJleHAiOjE3MjE0MTgzMjgsInJvbGUiOiJBQ0NFU1MiLCJwYXlsb2FkIjoie1widXNlclJvbGVcIjpcIkNVU1RPTUVSXCIsXCJpc1N0YWZmXCI6ZmFsc2UsXCJwZXJtaXNzaW9uR3JvdXBzXCI6W10sXCJjaXR5R3JvdXBzXCI6W10sXCJ1c2VySWRcIjoxNzM1Mzc4NjcsXCJkZXZpY2VJZFwiOjIxMDgxODQwNjEsXCJncmFudFR5cGVcIjpcIlBBU1NXT1JEXCJ9IiwidmVyc2lvbiI6IlYyIiwianRpIjoiNGQ4YmNiMmUtNGI2ZC00ODQ2LTg1MTMtZDNmNmJiNTFiYWZhIn0.ji0C_LVCDrKzuYo24X5aeE4NclH2fi9s51X1ec8oSmULbY2S56ADM-eGPBwi73hVtTTKf5FJJU0-07kFQMMGM1BxpeVBbUPqk5oBJMCVkimf-BqV0xAGEtZZSNhzQx4sSQJrYs3wiRdJt5eKUNvSjixXX0KnRIazbNqbCsuomTvAAvHDF1dSfn5pYNGPsjmIgf4qdv61_Pp28S3tYISf6fb3QfdTdy4BdgBL34xMf9jFNDOn5gCMmyOZmRTLR2JAS_Y2_rXc4LMDwG5qRF6VFG0Hzjzr--IPMhqW7zXYj3ZY7k9pXy9B1lMkMVGT2juNaMBON-fBhN9oA1dQtvzzLA"

const instance = axios.create({
    baseURL: "https://api.glovoapp.com/",
    headers: {
        "Authorization": Authorization,
        "Glovo-Location-City-Code": "MAR",
        "Glovo-App-Platform": "web"
    }
})

async function fetchCategories(storeId: number, addressId: number) {

    const categories: Category[] = []

    const response = await instance.get(`/v3/stores/${storeId}/addresses/${addressId}/node/store_menu`)

    console.log(`${storeId}:Fetch:Categories ${new Date}`)

    for (const primativeCategory of response.data.data.elements) {

        const tracking = primativeCategory.tracking

        if (!tracking.collectionGroupId) continue

        const category: Category = {
            name: primativeCategory.name,
            subcategories: [],
            products: []
        }

        categories.push(category)
    }

    return categories
}

async function fetchSupermarkets() {

    const supermarkets: Supermarket[] = []

    const response = await instance.get("/v3/feeds/categories/4")

    console.log(`Fetch:Supermarkets ${new Date}`)

    for (const primativeSupermarket of response.data.elements) {

        const singleData = primativeSupermarket.singleData

        if (!singleData) continue

        const storeData = singleData.storeData

        if (!storeData) continue

        const store = storeData.store

        const supermarket: Supermarket = {
            name: store.name,
            address: store.address,
            phoneNumber: store.phoneNumber,
            categories: await fetchCategories(store.id, store.addressId)
        }

        supermarkets.push(supermarket)

        break
    }

    return supermarkets
}

export default async function () {

    new Json("storage/supermarkets.json").update(await fetchSupermarkets())
}