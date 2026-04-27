import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const bannerModuleService = req.scope.resolve("banner")
    const banner = await bannerModuleService.retrieveBanner(req.params.id)
    res.json({ banner })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const bannerModuleService = req.scope.resolve("banner")
    const banner = await bannerModuleService.updateBanners({
        id: req.params.id,
        ...(req.body as Record<string, unknown>)
    })
    res.json({ banner })
}

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const bannerModuleService = req.scope.resolve("banner")
    await bannerModuleService.deleteBanners(req.params.id)
    res.json({ id: req.params.id, object: "banner", deleted: true })
}
