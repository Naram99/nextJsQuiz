import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import {and, eq} from "drizzle-orm";
import {LevelTable} from "@/drizzle/schema/role";

const userSelect = async ({username}: { username: string }) => {
    return db.select({
        id: UserTable.id,
        userName: UserTable.name,
        password: UserTable.password,
        email: UserTable.email,
        role: LevelTable.name
    }).from(UserTable).innerJoin(
        LevelTable,
        eq(UserTable.roleId, LevelTable.id)
    ).where(
        and(
            eq(UserTable.name, username),
            eq(UserTable.deleted, false)
        )
    );
}

export default userSelect;