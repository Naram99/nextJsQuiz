import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import {FriendTable} from "@/drizzle/schema/friends";
import {aliasedTable, and, eq, or} from "drizzle-orm";
import {jwtVerify} from "jose";

type friendData = {
    initiator: string;
    target: string;
    since: Date;
}

export async function GET() {
    // TODO: token verify extract
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const resp: {error: boolean, message: string, data: friendData[]} = {
        error: false,
        message: "",
        data: []
    }

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const username = decodedToken.payload.username as string;

        // TODO: db query to get requests, extract selects to dedicated functions
        const u1 = aliasedTable(UserTable, "u1");
        const u2 = aliasedTable(UserTable, "u2");
        const friendQueryResult = await db.select({
            initiator: u1.name,
            target: u2.name,
            since: FriendTable.updatedAt
        }).from(FriendTable).innerJoin(
            u1,
            eq(FriendTable.initiator, u1.id)
        ).innerJoin(
            u2,
            eq(FriendTable.target, u2.id)
        ).where(
            and(
                or(
                    eq(u1.name, username),
                    eq(u2.name, username)
                ),
                eq(FriendTable.accepted, true)
            )
        );

        console.log(friendQueryResult);
        resp.data = friendQueryResult;

    } catch (error) {
        console.error(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: resp.error ? 401 : 200});
}