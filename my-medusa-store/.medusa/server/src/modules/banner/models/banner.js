"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.Banner = utils_1.model.define("banner", {
    id: utils_1.model.id().primaryKey(),
    title: utils_1.model.text(),
    target_url: utils_1.model.text(),
    image_url: utils_1.model.text(),
    sort_order: utils_1.model.number().default(0),
    is_active: utils_1.model.boolean().default(true),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvYmFubmVyL21vZGVscy9iYW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRXBDLFFBQUEsTUFBTSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO0lBQ3pDLEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLEtBQUssRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ25CLFVBQVUsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3hCLFNBQVMsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3ZCLFVBQVUsRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyQyxTQUFTLEVBQUUsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Q0FDM0MsQ0FBQyxDQUFBIn0=