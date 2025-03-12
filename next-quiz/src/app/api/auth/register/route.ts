import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";

export async function POST(req: Request) {
    console.log(req)

    console.log(await db.select().from(UserTable))
}
