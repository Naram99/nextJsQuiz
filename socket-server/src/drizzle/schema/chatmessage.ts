import {json, pgTable, text, uuid} from "drizzle-orm/pg-core";
import {ChatRoomTable} from "./chatroom";
import {createdAt, id, updatedAt} from "../schemaHelper";
import {relations} from "drizzle-orm";

export const ChatMessageTable = pgTable("chat_message", {
    id,
    roomId: uuid().notNull().references(() => ChatRoomTable.id, {onDelete: "cascade"}),
    message: text().notNull(),
    seenBy: json().default([]),
    createdAt,
    updatedAt,
})

export const ChatMessageRelationShips = relations(ChatMessageTable, ({one})=> ({
    roomId: one(ChatRoomTable, {
        fields: [ChatMessageTable.roomId],
        references: [ChatRoomTable.id],
    })
}))