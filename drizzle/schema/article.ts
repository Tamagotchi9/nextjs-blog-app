import {pgTable, timestamp, varchar, text} from "drizzle-orm/pg-core";
import { createdAt, updatedAt, id } from "@/drizzle/schemaHelpers";
import {UserSyncTable} from "@/drizzle/schema/user";
import {relations} from "drizzle-orm";


export const ArticleTable = pgTable('articles', {
    id,
    title: varchar().notNull(),
    content: varchar().notNull(),
    imageUrl: varchar(),
    createdAt,
    updatedAt,
    postedAt: timestamp({ withTimezone: true }),
    authorId: text().references(() => UserSyncTable.id).notNull(),
    description: varchar().notNull(),
})

export const ArticleTableRelations = relations(ArticleTable, ({ one }) => ({
    author: one(UserSyncTable, {
        fields: [ArticleTable.authorId],
        references: [UserSyncTable.id]
    })
}))