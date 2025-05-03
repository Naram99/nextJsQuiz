import { db } from "@/drizzle/db";
import { ChatRoomTable } from "@/drizzle/schema";
import { UserTable } from "@/drizzle/schema/user";
import { chatRoom } from "@/utils/types/chatRoom.type";
import { eq, sql } from "drizzle-orm";

export default async function chatRoomSelect(id: string) {
    const respData: chatRoom[] = [];
    const ids = await db
        .select({
            id: ChatRoomTable.id,
            users: ChatRoomTable.userIdArray,
            name: ChatRoomTable.name,
        })
        .from(ChatRoomTable)
        .where(sql`${ChatRoomTable.userIdArray} @> ${JSON.stringify([id])}::jsonb`);

    for (const item of ids) {
        const room: chatRoom = {
            id: item.id,
            names: [],
        };

        if (Array.isArray(item.users) && item.name === null) {
            // The actual user's name needs to be filtered
            for (const userId of item.users.filter((userId) => userId !== id)) {
                const nameArr = await db
                    .select({
                        name: UserTable.name,
                    })
                    .from(UserTable)
                    .where(eq(UserTable.id, userId));

                room.names.push(nameArr[0].name);
            }
        }

        if (item.name !== null) {
            room.names.push(item.name);
        }

        respData.push(room);
    }

    return respData;
}
