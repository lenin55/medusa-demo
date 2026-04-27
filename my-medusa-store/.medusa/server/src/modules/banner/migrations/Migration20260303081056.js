"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20260303081056 = void 0;
const migrations_1 = require("@medusajs/framework/mikro-orm/migrations");
class Migration20260303081056 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "banner" ("id" text not null, "title" text not null, "target_url" text not null, "image_url" text not null, "sort_order" integer not null default 0, "is_active" boolean not null default true, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "banner_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_banner_deleted_at" ON "banner" ("deleted_at") WHERE deleted_at IS NULL;`);
    }
    async down() {
        this.addSql(`drop table if exists "banner" cascade;`);
    }
}
exports.Migration20260303081056 = Migration20260303081056;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNjAzMDMwODEwNTYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iYW5uZXIvbWlncmF0aW9ucy9NaWdyYXRpb24yMDI2MDMwMzA4MTA1Ni50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBcUU7QUFFckUsTUFBYSx1QkFBd0IsU0FBUSxzQkFBUztJQUUzQyxLQUFLLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsMllBQTJZLENBQUMsQ0FBQztRQUN6WixJQUFJLENBQUMsTUFBTSxDQUFDLHlHQUF5RyxDQUFDLENBQUM7SUFDekgsQ0FBQztJQUVRLEtBQUssQ0FBQyxJQUFJO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBRUY7QUFYRCwwREFXQyJ9