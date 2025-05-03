import { eq, sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ChatMessageTable, ChatRoomTable, UserTable } from "../drizzle/schema";

export default class DbHandler {
    private _db;

    constructor() {
        this._db = db;
    }

    async selectSingleUser(id: string) {
        return await this._db.select().from(UserTable).where(eq(UserTable.id, id));
    }

    async selectRoomsForUser(id: string) {
        return await this._db
            .select({
                id: ChatRoomTable.id,
            })
            .from(ChatRoomTable)
            .where(sql`userIdArray @> ${JSON.stringify([id])}::jsonb`);
    }

    async insertChatMessage(roomId: string, userId: string, message: string) {
        return await this._db.insert(ChatMessageTable).values({
            roomId: roomId,
            message: message,
            createdBy: userId,
        });
    }
}
