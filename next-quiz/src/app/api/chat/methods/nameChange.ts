import { db } from "@/drizzle/db";
import { ChatRoomTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Renames a chat room
 * @param id room id where the name is about to be changed
 * @param name new name of the room
 * @returns Query result
 */
export default async function nameChange(id: string, name: string) {
    return await db
        .update(ChatRoomTable)
        .set({
            name: name,
        })
        .where(eq(ChatRoomTable.id, id));
}
