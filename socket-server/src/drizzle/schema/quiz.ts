import {boolean, jsonb, pgTable, text, uuid} from "drizzle-orm/pg-core";
import {createdAt, id, updatedAt} from "../schemaHelper";
import {relations} from "drizzle-orm";
import {UserTable} from "./user";

export const QuizTable = pgTable('quiz', {
    id,
    userId: uuid().references(() => UserTable.id, {onDelete: "cascade"}),
    title: text().notNull(),
    coverImg: text(),
    type: text().notNull(),
    hasCategories: boolean().notNull().default(false),
    questions: jsonb().notNull().default({}),
    createdAt,
    updatedAt,
})

export const QuizRelations = relations(QuizTable, ({one}) => ({
    user: one(UserTable, {
        fields: [QuizTable.userId],
        references: [UserTable.id]
    })
}))