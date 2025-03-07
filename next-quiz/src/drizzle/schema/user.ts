import {pgTable, text, timestamp} from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt, deleted } from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {RoleTable} from "@/drizzle/schema/role";
import {QuizTable} from "@/drizzle/schema/quiz";

export const UserTable = pgTable("users", {
    id,
    name: text().notNull(),
    email: text(),
    phone: text(),
    password: text().notNull(),
    roleId: id.references(() => RoleTable.id, {onDelete: "restrict"}),
    lastLogin: timestamp({withTimezone: true}).notNull().defaultNow(),
    createdAt,
    updatedAt,
    deleted,
});

export const UserRelationships = relations(UserTable, ({one, many}) => ({
    role: one(RoleTable, {
        fields: [UserTable.roleId],
        references: [RoleTable.id]
    }),
    id: many(QuizTable)
}))