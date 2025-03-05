import {pgEnum, pgTable} from "drizzle-orm/pg-core";
import {id, createdAt, updatedAt} from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {UserTable} from "@/drizzle/schema/user";

export const roles = ['admin', 'member', 'user'] as const;
export type Role = typeof roles[number];
export const roleEnum = pgEnum("role", roles);

export const RoleTable = pgTable("role", {
    id,
    name: roleEnum().notNull().default("user"),
    createdAt,
    updatedAt,
})

export const RoleRelationships = relations(RoleTable, ({many}) => ({
    id: many(UserTable)
}))