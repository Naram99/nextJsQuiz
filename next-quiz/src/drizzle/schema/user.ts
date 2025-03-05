import {pgTable, text, uuid} from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt, deleted } from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {RoleTable} from "@/drizzle/schema/role";

export  const UserTable = pgTable("users", {
    id,
    name: text().notNull(),
    email: text(),
    phone: text(),
    password: text().notNull(),
    roleId: uuid().notNull().references(() => RoleTable.id, {onDelete: "restrict"}),
    createdAt,
    updatedAt,
    deleted,
});

export const UserRelationships = relations(UserTable, ({one}) => ({
    role: one(RoleTable, {
        fields: [UserTable.roleId],
        references: [RoleTable.id]
    })
}))