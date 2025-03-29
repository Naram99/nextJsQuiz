import {aliasedTable, and, eq, or} from "drizzle-orm";
import {UserTable} from "@/drizzle/schema/user";
import {db} from "@/drizzle/db";
import {FriendTable} from "@/drizzle/schema/friends";

export default function friendSelect(username: string) {
    const u1 = aliasedTable(UserTable, "u1");
    const u2 = aliasedTable(UserTable, "u2");
    return db.select({
        initiator: u1.name,
        target: u2.name,
        since: FriendTable.updatedAt
    }).from(FriendTable).innerJoin(
        u1,
        eq(FriendTable.initiator, u1.id)
    ).innerJoin(
        u2,
        eq(FriendTable.target, u2.id)
    ).where(
        and(
            or(
                eq(u1.name, username),
                eq(u2.name, username)
            ),
            eq(FriendTable.accepted, true)
        )
    );
}