import { db } from "@/drizzle/db";
import { ChatRoomTable } from "@/drizzle/schema";

export default async function chatRoomCreate(idArr: string[]) {
    return await db.insert(ChatRoomTable).values({
        userIdArray: idArr
    })
}