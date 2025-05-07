import { db } from "@/drizzle/db";
import { FriendTable, UserTable } from "@/drizzle/schema";
import { aliasedTable, and, eq, like, or } from "drizzle-orm";

export default async function searchUsers(id: string, params: string) {
    return await db
        .select({ id: UserTable.id, name: UserTable.name })
        .from(UserTable)
        .where(like(UserTable.name, `%${params}%`));
}
