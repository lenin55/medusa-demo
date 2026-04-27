"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
async function GET(req, res) {
    const query = req.scope.resolve("query");
    const { data: banners, metadata } = await query.graph({
        entity: "banner",
        fields: ["*"],
        filters: req.filterableFields,
        pagination: req.remoteQueryConfig?.pagination,
    });
    res.json({
        banners,
        count: metadata?.count,
        offset: metadata?.skip,
        limit: metadata?.take,
    });
}
async function POST(req, res) {
    const bannerModuleService = req.scope.resolve("banner");
    const banner = await bannerModuleService.createBanners(req.body);
    res.json({ banner });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2Jhbm5lcnMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFtQkM7QUFFRCxvQkFPQztBQTVCTSxLQUFLLFVBQVUsR0FBRyxDQUNyQixHQUFrQixFQUNsQixHQUFtQjtJQUVuQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV4QyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxFQUFFLFFBQVE7UUFDaEIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0I7UUFDN0IsVUFBVSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVO0tBQ2hELENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDTCxPQUFPO1FBQ1AsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSTtRQUN0QixLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUk7S0FDeEIsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUVNLEtBQUssVUFBVSxJQUFJLENBQ3RCLEdBQWtCLEVBQ2xCLEdBQW1CO0lBRW5CLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQVcsQ0FBQyxDQUFBO0lBQ3ZFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0FBQ3hCLENBQUMifQ==