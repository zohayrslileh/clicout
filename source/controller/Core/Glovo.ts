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

const Authorization = "eyJraWQiOiJvbGQiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE3MjE0MTQzNDIsImlzcyI6ImF1dGgiLCJleHAiOjE3MjE0MTU1NDIsInJvbGUiOiJBQ0NFU1MiLCJwYXlsb2FkIjoie1widXNlclJvbGVcIjpcIkNVU1RPTUVSXCIsXCJpc1N0YWZmXCI6ZmFsc2UsXCJwZXJtaXNzaW9uR3JvdXBzXCI6W10sXCJjaXR5R3JvdXBzXCI6W10sXCJ1c2VySWRcIjoxNzM1Mzc4NjcsXCJkZXZpY2VJZFwiOjIxMDgxODQwNjEsXCJncmFudFR5cGVcIjpcIlBBU1NXT1JEXCJ9IiwidmVyc2lvbiI6IlYyIiwianRpIjoiOTEzNGI1NGUtNTk0ZS00YTAzLThmOGEtZTQ4M2RiNzIyNmU3In0.Uio4_wISBVoXON1_U0N3G25DceG2KrOxyCmTjLBaqdSgr6vgUMbtTjeOWr04WNudVjDhmdO1UzZMETPTVHLQ7MBqwPFmxukxe5rbLbzZ8ZWQLfALjf-rKq6k8Ol0OBtkmrXvZFcqXPDDxiWiHtY3CnFYUyYTVrVdz878Pq2XMBe5A6ooy8bEXJ_a3o3aYZpSA-0bRpYt2CIWe7sKNBnToZwFU2KvaEOsUxpi_zNu3VaqaSSUC0hmYHuaU4rYzJUH46MYhFXehDvtPqSECceKIhM06i9tgxFNuNJkWwmSgIPkaY1Za898xFeJEkAUIWEXWneWW9Tn3ID0atgz5iMqGQ"

const instance = axios.create({
    baseURL: "https://api.glovoapp.com/",
    headers: {
        "Authorization": Authorization,
        "Glovo-Location-City-Code": "MAR",
        "Glovo-App-Platform": "web"
    }
})

async function fetchSupermarkets() {

    const supermarkets: Supermarket[] = []

    const response = await instance.get("/v3/feeds/categories/4?cacheId=MAR_EhxSdWUgRsOocywgTWFycmFrZXNoLCBNb3JvY2NvIi4qLAoUChIJD_FTAjbprw0RY5yeVA9AJeoSFAoSCVGeF5aN7q8NEbith09TtlBZ&limit=48&offset=0")

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
            categories: []
        }

        supermarkets.push(supermarket)
    }

    return supermarkets
}

export default async function () {

    new Json("storage/supermarkets.json").update(await fetchSupermarkets())
}