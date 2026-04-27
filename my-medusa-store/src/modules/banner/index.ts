import { Module } from "@medusajs/framework/utils"
import BannerModuleService from "./service"

export default Module("banner", {
    service: BannerModuleService,
})
