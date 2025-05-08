import { db } from "@/drizzle/db";
import { FriendTable } from "@/drizzle/schema";

export default async function sendRequest(id: string, target: string) {
    return await db.insert(FriendTable).values({
        initiator: id,
        target: target,
    });
}
