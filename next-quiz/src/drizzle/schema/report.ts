import {pgEnum, pgTable, text, uuid} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

export const entityTypes = ["user", "post", "comment"] as const;
export type EntityTypes = typeof entityTypes[number];
export const entityTypeEnum = pgEnum("entity_enum", entityTypes);

export const ReportTable = pgTable("report", {
    id,
    entityId: uuid().notNull(),
    entityType: entityTypeEnum().notNull().default("user"),
    description: text(),
    createdBy: uuid()
        .notNull()
        .references(() => UserTable.id, { onDelete: "no action" }),
    reviewedBy: uuid().references(() => UserTable.id, { onDelete: "no action" }),
    result: text(),
    createdAt,
    updatedAt,
});

export const ReportTableRelationships = relations(ReportTable, ({ one }) => ({
    creator: one(UserTable, {
        fields: [ReportTable.createdBy],
        references: [UserTable.id],
        relationName: "reportCreator",
    }),
    reviewer: one(UserTable, {
        fields: [ReportTable.reviewedBy],
        references: [UserTable.id],
        relationName: "reportReviewer",
    }),
}));
