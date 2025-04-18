import {db} from "@/drizzle/db";
import {ForumCommentTable} from "@/drizzle/schema/forumcomment";
import {UserTable} from "@/drizzle/schema/user";
import {eq} from "drizzle-orm";

export default async function insertComment(
    username: string,
    forum: string,
    comment: string,
    answerTo: string) {
    const userSelect = await db.select({
        id: UserTable.id
    }).from(UserTable).where(
        eq(UserTable.name, username),
    )

    return db.insert(ForumCommentTable).values({
        forumId: forum,
        userId: userSelect[0].id,
        comment: comment,
        answerTo: answerTo,
    })
}