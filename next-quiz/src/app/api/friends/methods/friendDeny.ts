import {db} from "@/drizzle/db";
import {FriendTable} from "@/drizzle/schema/friends";
import {eq} from "drizzle-orm";

export default async function friendDeny(id: string) {
    return db.update(FriendTable).set({
        accepted: false,
        deleted: true,
    }).where(
        eq(FriendTable.id, id),
    )
}