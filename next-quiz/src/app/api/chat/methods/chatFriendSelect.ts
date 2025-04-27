import {db} from "@/drizzle/db";
import {FriendTable} from "@/drizzle/schema/friends";
import {UserTable} from "@/drizzle/schema/user";
import {aliasedTable, eq, or, sql} from "drizzle-orm";

export default async function chatFriendSelect(username: string) {
    const u1 = aliasedTable(UserTable, "u1");
    const u2 = aliasedTable(UserTable, "u2");

    return db.select({
        id: sql<string>`
            CASE 
                WHEN
                    ${u1.name} = ${username} THEN ${u2.id}
                WHEN
                    ${u2.name} = ${username} THEN ${u1.id}
            END`,
        name: sql<string>`
            CASE 
                WHEN
                    ${u1.name} = ${username} THEN ${u2.name}
                WHEN
                    ${u2.name} = ${username} THEN ${u1.name}
            END`,
    }).from(FriendTable).innerJoin(
        u1,
        eq(FriendTable.initiator, u1.id)
    ).innerJoin(
        u2,
        eq(FriendTable.target, u2.id)
    ).where(
        or(
            eq(u1.name, username),
            eq(u2.name, username)
        )
    )
}