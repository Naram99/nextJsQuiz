import {aliasedTable, and, eq} from "drizzle-orm";
import {UserTable} from "@/drizzle/schema/user";
import {db} from "@/drizzle/db";
import {FriendTable} from "@/drizzle/schema/friends";

export default function requestSelect(username: string) {
    const u1 = aliasedTable(UserTable, "u1");
    const u2 = aliasedTable(UserTable, "u2");
    return db.select({
        initiator: u1.name
    }).from(FriendTable).innerJoin(
        u1,
        eq(FriendTable.initiator, u1.id)
    ).innerJoin(
        u2,
        eq(FriendTable.target, u2.id)
    ).where(
        and(
            eq(u2.name, username),
            eq(FriendTable.accepted, false)
        )
    );
}