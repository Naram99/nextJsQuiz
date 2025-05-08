import { db } from "@/drizzle/db";
import { FriendTable, UserTable } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

export default async function searchUsers(id: string, params: string) {
    return await db
        .select({ id: UserTable.id, name: UserTable.name })
        .from(UserTable)
        .where(sql`LOWER(${UserTable.name}) LIKE LOWER(%${params}%) 
	                AND ${UserTable.id} <> ${id}
	                AND ${UserTable.id} NOT IN (
                        SELECT CASE WHEN ${FriendTable.target} = ${id} THEN ${FriendTable.initiator}
									WHEN ${FriendTable.initiator} = ${id} THEN ${FriendTable.target}
									END AS ids
						FROM ${FriendTable}
						WHERE ${FriendTable.target} = ${id} OR ${FriendTable.initiator} = ${id})`);
}
