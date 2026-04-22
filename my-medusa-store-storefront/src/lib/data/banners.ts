"use server"

import { sdk } from "@lib/config"

export const getBanners = async () => {
    return sdk.client
        .fetch<{ banners: any[] }>(`/store/banners`, {
            method: "GET",
            headers: {
                "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
            },
            next: {
                revalidate: 60,
            }
        })
        .then(({ banners }) => banners)
        .catch((err) => {
            console.error("Failed to fetch banners", err)
            return []
        })
}
