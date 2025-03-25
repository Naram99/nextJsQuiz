import {pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt, deleted } from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {LevelTable} from "@/drizzle/schema/role";
import {QuizTable} from "@/drizzle/schema/quiz";
import { FriendTable } from "./friends";

export const UserTable = pgTable("user_data", {
    id,
    name: text().notNull(),
    email: text(),
    phone: text(),
    password: text().notNull(),
    roleId: uuid().references(() => LevelTable.id, {onDelete: "restrict"}),
    profilePicture: text(),
    lastLogin: timestamp({withTimezone: true}).notNull().defaultNow(),
    createdAt,
    updatedAt,
    deleted,
});

export const UserRelationships = relations(UserTable, ({one, many}) => ({
    role: one(LevelTable, {
        fields: [UserTable.roleId],
        references: [LevelTable.id]
    }),
    id: many(QuizTable),
    initiatorId: many(FriendTable, {relationName: "initiator"}),
    targetId: many(FriendTable, {relationName: "target"}),
}))