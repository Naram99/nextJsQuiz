import { eq, sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ChatMessageTable, ChatRoomTable, GameTable, UserTable } from "../drizzle/schema";

export default class DbHandler {
    private _db;

    constructor() {
        this._db = db;
    }

    public async selectSingleUser(id: string) {
        return await this._db.select().from(UserTable).where(eq(UserTable.id, id));
    }

    public async selectRoomsForUser(id: string) {
        return await this._db
            .select({
                id: ChatRoomTable.id,
            })
            .from(ChatRoomTable)
            .where(sql`${ChatRoomTable.userIdArray} @> ${JSON.stringify([id])}::jsonb`);
    }

    public async insertChatMessage(roomId: string, userId: string, message: string) {
        return await this._db.insert(ChatMessageTable).values({
            roomId: roomId,
            message: message,
            createdBy: userId,
        });
    }

    public async insertGame(players: string[], type: string, score: Record<string, string>) {
        return await this._db.insert(GameTable).values({
            players: players,
            gameType: type,
            finalScore: score,
        });
    }
}
