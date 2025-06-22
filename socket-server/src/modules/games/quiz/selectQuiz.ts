import { eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { QuizTable } from "../../../drizzle/schema";

export default async function selectQuiz(id: string) {
    return await db
        .select({
            owner: QuizTable.userId,
            type: QuizTable.type,
            hasCategories: QuizTable.hasCategories,
            categories: QuizTable.questions,
        })
        .from(QuizTable)
        .where(eq(QuizTable.id, id));
}
