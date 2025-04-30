import { json, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, deleted, id, updatedAt } from "../schemaHelper";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";
import { ForumCommentTable } from "./forumcomment";

export const ForumPostTable = pgTable("forum_post", {
    id,
    title: text().notNull(),
    description: text(),
    pictures: json().default({}),
    createdBy: uuid().notNull().references(() => UserTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
    deleted
})

export const ForumPostTableRelationships = relations(ForumPostTable, ({one, many}) => ({
    creator: one(UserTable, {
        fields: [ForumPostTable.createdBy],
        references: [UserTable.id]
    }),
    comment: many(ForumCommentTable)
}))