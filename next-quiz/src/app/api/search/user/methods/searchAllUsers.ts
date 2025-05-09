import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { and, like, ne, sql } from "drizzle-orm";

export default async function searchAllUsers(id: string, params: string) {
    return await db
        .select({
            id: UserTable.id,
            name: UserTable.name,
        })
        .from(UserTable).where(sql`LOWER(${UserTable.name}) 
            LIKE LOWER(${sql.param(`%${params}%`)})
            AND ${UserTable.id} <> ${sql.param(id)}`);
}
