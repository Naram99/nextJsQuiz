import { db } from "@/drizzle/db";
import { FriendTable, UserTable } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

export default async function searchUsers(id: string, params: string) {
    // return await db.select({ id: UserTable.id, name: UserTable.name }).from(UserTable)
    //     .where(sql`LOWER(${UserTable.name}) LIKE LOWER('%${params}%')
    //                 AND ${UserTable.id} <> ${id}
    //                 AND ${UserTable.id} NOT IN (
    //                     SELECT ${FriendTable.initiator}
    // 					FROM ${FriendTable}
    // 					WHERE ${FriendTable.target} = ${id}

    // 					UNION

    // 					SELECT ${FriendTable.target}
    // 					FROM ${FriendTable}
    // 					WHERE ${FriendTable.initiator} = ${id})`);

    const friendsSubquery = sql`
	(
		SELECT ${FriendTable.initiator}
		FROM ${FriendTable}
		WHERE ${FriendTable.target} = ${id}

		UNION

		SELECT ${FriendTable.target}
		FROM ${FriendTable}
		WHERE ${FriendTable.initiator} = ${id}
	)
	`;

    const result = await db
        .select({
            id: UserTable.id,
            name: UserTable.name,
        })
        .from(UserTable).where(sql`
			LOWER(${UserTable.name}) LIKE LOWER(${`%${params}%`})
			AND ${UserTable.id} <> ${id}
			AND ${UserTable.id} NOT IN ${friendsSubquery}
		`);

    return result;
}
