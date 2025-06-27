import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable, UserTable } from "../../../drizzle/schema";

export default async function selectQuiz(id: string) {
    return await db
        .select({
            owner: UserTable.name,
            type: QuizTable.type,
            hasCategories: QuizTable.hasCategories,
            categories: QuizTable.questions,
        })
        .from(QuizTable)
        .innerJoin(UserTable, eq(QuizTable.userId, UserTable.id))
        .where(eq(QuizTable.id, id));
}
