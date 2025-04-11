import {ForumPostTable} from "@/drizzle/schema/forumpost";
import {db} from "@/drizzle/db";
import {eq} from "drizzle-orm";
import {UserTable} from "@/drizzle/schema/user";

export default async function selectPost({id}: {id: string}) {
    return db.select({
        owner: UserTable.name
    }).from(ForumPostTable).innerJoin(
        UserTable,
        eq(ForumPostTable.createdBy, UserTable.id)
    ).where(eq(ForumPostTable.id, id))
}