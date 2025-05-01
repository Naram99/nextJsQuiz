import {db} from "@/drizzle/db";
import { ChatRoomTable } from "@/drizzle/schema";
import {UserTable} from "@/drizzle/schema/user";
import { chatRoom } from "@/utils/types/chatRoom.type";
import {eq, sql} from "drizzle-orm";

export default async function chatRoomSelect(id: string) {
    const respData: chatRoom[] = []
    const ids = await db.select({
        id: ChatRoomTable.id,
        users: ChatRoomTable.userIdArray,
        name: ChatRoomTable.name
    }).from(ChatRoomTable).where(
        sql`${ChatRoomTable.userIdArray} @> ${JSON.stringify([id])}::jsonb`
    );
    
    console.log(ids);

    ids.forEach(item => {
        const room: chatRoom = {
            id: item.id,
            names: []
        }

        if (Array.isArray(item.users) && item.name === null) {
            item.users.filter(userId => userId !== item.id).forEach(async userId => {
                const nameArr = await db.select({
                    name: UserTable.name
                }).from(UserTable).where(eq(UserTable.id, userId));

                room.names.push(nameArr[0].name)
            })
        }

        if (item.name !== null) {
            room.names.push(item.name);
        }

        respData.push(room);
    })

    return respData;
}