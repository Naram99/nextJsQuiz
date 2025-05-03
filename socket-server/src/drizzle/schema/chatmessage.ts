import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { ChatRoomTable } from "./chatroom";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";

export const ChatMessageTable = pgTable("chat_message", {
    id,
    roomId: uuid()
        .notNull()
        .references(() => ChatRoomTable.id, { onDelete: "cascade" }),
    message: text().notNull(),
    seenBy: jsonb().default([]),
    createdBy: uuid()
        .notNull()
        .references(() => UserTable.id, { onDelete: "no action" }),
    createdAt,
    updatedAt,
});

export const ChatMessageRelationShips = relations(ChatMessageTable, ({ one }) => ({
    roomId: one(ChatRoomTable, {
        fields: [ChatMessageTable.roomId],
        references: [ChatRoomTable.id],
    }),
    createdBy: one(UserTable, {
        fields: [ChatMessageTable.createdBy],
        references: [UserTable.id],
    }),
}));
