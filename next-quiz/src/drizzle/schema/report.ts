import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";

// TODO: EntityType enum

export const ReportTable = pgTable("report", {
    id,
    entityId: uuid().notNull(),
    entityType: text().notNull(),
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
