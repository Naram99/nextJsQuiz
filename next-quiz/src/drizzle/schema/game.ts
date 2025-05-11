import { jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";

export const GameTable = pgTable("game", {
    id,
    players: jsonb().default([]),
    gameType: text().notNull(),
    finalScore: jsonb().default({}),
    createdAt,
    updatedAt,
});
