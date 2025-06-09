import { db } from "@/drizzle/db";
import { SkinsTable } from "@/drizzle/schema";

export default async function getSkins() {
    return await db.select({
        name: SkinsTable.name,
        champion: SkinsTable.champion
    }).from(SkinsTable)
}