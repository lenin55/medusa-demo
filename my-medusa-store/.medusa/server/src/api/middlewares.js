"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_1 = require("@medusajs/medusa");
exports.default = (0, medusa_1.defineMiddlewares)({
    routes: [
        {
            matcher: "/store/banners",
            middlewares: [
                (req, res, next) => {
                    // Temporarily bypass requirePublishableKey for this custom custom route.
                    // This is a quick fix since we just want public unauth access.
                    return next();
                }
            ],
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQW9EO0FBRXBELGtCQUFlLElBQUEsMEJBQWlCLEVBQUM7SUFDN0IsTUFBTSxFQUFFO1FBQ0o7WUFDSSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRTtnQkFDVCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7b0JBQ2YseUVBQXlFO29CQUN6RSwrREFBK0Q7b0JBQy9ELE9BQU8sSUFBSSxFQUFFLENBQUE7Z0JBQ2pCLENBQUM7YUFDSjtTQUNKO0tBQ0o7Q0FDSixDQUFDLENBQUEifQ==