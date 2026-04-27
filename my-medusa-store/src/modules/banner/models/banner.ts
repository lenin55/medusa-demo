import { model } from "@medusajs/framework/utils"

export const Banner = model.define("banner", {
    id: model.id().primaryKey(),
    title: model.text(),
    target_url: model.text(),
    image_url: model.text(),
    sort_order: model.number().default(0),
    is_active: model.boolean().default(true),
})
