import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const query = req.scope.resolve("query")

    const { data: banners, metadata } = await query.graph({
        entity: "banner",
        fields: ["*"],
        filters: req.filterableFields,
        pagination: req.remoteQueryConfig?.pagination,
    })

    res.json({
        banners,
        count: metadata?.count,
        offset: metadata?.skip,
        limit: metadata?.take,
    })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const bannerModuleService = req.scope.resolve("banner")
    const banner = await bannerModuleService.createBanners(req.body as any)
    res.json({ banner })
}
