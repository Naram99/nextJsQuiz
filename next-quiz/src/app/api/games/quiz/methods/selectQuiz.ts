import { db } from "@/drizzle/db";
import { QuizTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function selectQuiz(id: string) {
    return await db.select().from(QuizTable).where(eq(QuizTable.id, id));
}
