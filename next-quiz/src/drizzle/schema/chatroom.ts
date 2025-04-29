import {json, pgTable} from "drizzle-orm/pg-core";
import {createdAt, id, updatedAt} from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {ChatMessageTable} from "@/drizzle/schema/chatmessage";

export const ChatRoomTable = pgTable("chat_room", {
    id,
    userIdArray: json().default([]),
    createdAt,
    updatedAt
});

export const ChatRoomRelationships = relations(ChatRoomTable, ({many}) => ({
    roomId: many(ChatMessageTable),
}))