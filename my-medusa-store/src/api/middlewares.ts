import { defineMiddlewares } from "@medusajs/medusa"

export default defineMiddlewares({
    routes: [
        {
            matcher: "/store/banners",
            middlewares: [
                (req, res, next) => {
                    // Temporarily bypass requirePublishableKey for this custom custom route.
                    // This is a quick fix since we just want public unauth access.
                    return next()
                }
            ],
        },
    ],
})
