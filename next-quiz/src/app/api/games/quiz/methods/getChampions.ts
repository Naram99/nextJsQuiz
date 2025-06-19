import { db } from "@/drizzle/db";
import { SkinsTable } from "@/drizzle/schema";

export default async function getChampions() {
    return await db.selectDistinct({
        champion: SkinsTable.champion
    }).from(SkinsTable).orderBy(SkinsTable.champion)
}