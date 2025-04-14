import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { ForumPostTable } from "./forumpost";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

export const ForumCommentTable = pgTable("forum_comment", {
    id,
    forumId: uuid().notNull().references(() => ForumPostTable.id, {onDelete: "cascade"}),
    userId: uuid().notNull().references(() => UserTable.id, {onDelete: "cascade"}),
    comment: text().notNull(),
    answerTo: uuid(),
    createdAt,
    updatedAt
});

export const ForumCommentRelationships = relations(ForumCommentTable, ({one, many}) => ({
    creator: one(UserTable, {
        fields: [ForumCommentTable.userId],
        references: [UserTable.id]
    }),
    forum: one(ForumPostTable, {
        fields: [ForumCommentTable.forumId],
        references: [ForumPostTable.id]
    }),
    parent: one(ForumCommentTable, {
        fields: [ForumCommentTable.answerTo],
        references: [ForumCommentTable.id],
        relationName: "childComments"
    }),
    child: many(ForumCommentTable, {relationName: "childComments"})
}))