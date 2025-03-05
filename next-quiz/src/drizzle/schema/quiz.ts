import {boolean, json, pgTable, text} from "drizzle-orm/pg-core";
import {createdAt, id, updatedAt} from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {UserTable} from "@/drizzle/schema/user";

export const QuizTable = pgTable('quiz', {
    id,
    userId: id,
    title: text().notNull(),
    coverImg: text(),
    type: text().notNull(),
    hasCategories: boolean().notNull().default(false),
    questions: json().notNull().default({}),
    createdAt,
    updatedAt,
})

export const QuizRelations = relations(QuizTable, ({one}) => ({
    user: one(UserTable, {
        fields: [QuizTable.userId],
        references: [UserTable.id]
    })
}))