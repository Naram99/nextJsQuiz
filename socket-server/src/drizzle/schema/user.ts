import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt, deleted } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { LevelTable } from "./role";
import { QuizTable } from "./quiz";
import { FriendTable } from "./friends";
import { ForumPostTable } from "./forumpost";
import { ReportTable } from "./report";

export const UserTable = pgTable("user_data", {
    id,
    name: text().notNull(),
    email: text(),
    phone: text(),
    password: text().notNull(),
    roleId: uuid()
        .notNull()
        .references(() => LevelTable.id, { onDelete: "restrict" }),
    profilePicture: text(),
    lastLogin: timestamp({ withTimezone: true }).notNull().defaultNow(),
    createdAt,
    updatedAt,
    deleted,
});

export const UserRelationships = relations(UserTable, ({ one, many }) => ({
    role: one(LevelTable, {
        fields: [UserTable.roleId],
        references: [LevelTable.id],
    }),
    id: many(QuizTable),
    initiatorId: many(FriendTable, { relationName: "initiator" }),
    targetId: many(FriendTable, { relationName: "target" }),
    postCreator: many(ForumPostTable),
    reportCreator: many(ReportTable, { relationName: "reportCreator" }),
    reportReviewer: many(ReportTable, { relationName: "reportReviewer" }),
}));
