import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import {eq, or} from "drizzle-orm";

const userCheck = async ({username, email}: {username: string, email: string}) => {
    let userExists: boolean = false;
    const queryResult = await db.select().from(UserTable).where(
        or(
            eq(UserTable.name, username),
            eq(UserTable.email, email)
        )
    )

    if (queryResult.length > 0)
        userExists = true;

    return userExists;
}

export default userCheck;