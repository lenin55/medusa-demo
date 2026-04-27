import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const query = req.scope.resolve("query")

    const { data: banners } = await query.graph({
        entity: "banner",
        fields: ["*"],
        filters: {
            is_active: true
        }
    })

    // Sort by sort_order
    banners.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

    res.json({ banners })
}
