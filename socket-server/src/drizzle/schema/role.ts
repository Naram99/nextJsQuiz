import {pgEnum, pgTable} from "drizzle-orm/pg-core";
import {id, createdAt, updatedAt} from "../schemaHelper";
import {relations} from "drizzle-orm";
import {UserTable} from "./user";

export const roles = ['admin', 'member', 'user'] as const;
export type Role = typeof roles[number];
export const roleEnum = pgEnum("level_enum", roles);

export const LevelTable = pgTable("level_user", {
    id,
    name: roleEnum().notNull().default("user"),
    createdAt,
    updatedAt,
})

export const RoleRelationships = relations(LevelTable, ({many}) => ({
    id: many(UserTable)
}))