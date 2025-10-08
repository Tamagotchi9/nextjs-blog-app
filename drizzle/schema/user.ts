import {varchar, pgSchema, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {ArticleTable} from "@/drizzle/schema/article";

const neonAuth = pgSchema("neon_auth");

export const UserSyncTable = neonAuth.table('users_sync', {
    id: text().primaryKey(),
    name: varchar(),
    email: varchar(),
})