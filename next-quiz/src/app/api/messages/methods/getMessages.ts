import { db } from "@/drizzle/db";
import { ChatMessageTable, UserTable } from "@/drizzle/schema";
import { chatMessage } from "@/utils/types/chatMessage.type";
import { eq } from "drizzle-orm";

export default async function getMessages(room: string): Promise<chatMessage[]> {
    return await db
        .select({
            message: ChatMessageTable.message,
            room: ChatMessageTable.roomId,
            sender: UserTable.name,
        })
        .from(ChatMessageTable)
        .innerJoin(UserTable, eq(UserTable.id, ChatMessageTable.createdBy))
        .where(eq(ChatMessageTable.roomId, room));
}
