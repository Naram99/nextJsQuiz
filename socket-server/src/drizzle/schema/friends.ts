import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, deleted, id, updatedAt } from "../schemaHelper";
import { boolean } from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

export const FriendTable = pgTable("friends", {
    id,
    initiator: uuid().notNull().references(() => UserTable.id, {onDelete: "restrict"}),
    target: uuid().notNull().references(() => UserTable.id, {onDelete: "restrict"}),
    accepted: boolean().default(false),
    createdAt,
    updatedAt,
    deleted,
})

export const FriendRelationships = relations(FriendTable, ({one}) => ({
    initiator: one(UserTable, {
        fields: [FriendTable.initiator],
        references: [UserTable.id],
        relationName: "initiator",
    }),
    target: one(UserTable, {
        fields: [FriendTable.target],
        references: [UserTable.id],
        relationName: "target",
    }),
}))