import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import {eq} from "drizzle-orm";
import {ForumPostTable} from "@/drizzle/schema/forumpost";

export default async function insertPost(username: string, postTitle: string, description: string) {
    const userSelect = await db.select({
        id: UserTable.id
    }).from(UserTable).where(
        eq(UserTable.name, username),
    )

    return db.insert(ForumPostTable).values({
        title: postTitle,
        description: description,
        createdBy: userSelect[0].id
    })
}