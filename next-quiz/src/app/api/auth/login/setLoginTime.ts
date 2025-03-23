import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import {eq, sql} from "drizzle-orm";

export default async function setLoginTime({userName}: {userName: string}) {
    const resp = {
        error: false,
        message: ""
    }
    try {
        await db.update(UserTable).set({lastLogin: sql`NOW()`}).where(eq(UserTable.name, userName));
    } catch (error) {
        console.error(error);
        resp.error = true;
    }

    return resp;
}