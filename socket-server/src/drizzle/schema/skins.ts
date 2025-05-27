import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdAt } from "../schemaHelper";

export const SkinsTable = pgTable("skins", {
    id: serial().primaryKey(),
    champion: text().notNull(),
    number: integer().notNull(),
    name: text().notNull(),
    src: text().notNull(),
    createdAt,
});
