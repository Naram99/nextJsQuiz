import {cookies} from "next/headers";
import {jwtVerify} from "jose";
import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import {eq, sql} from "drizzle-orm";
import {NextResponse} from "next/server";

export async function DELETE() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const resp = {
        error: false,
        message: ""
    }

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const userName = decodedToken.payload.username as string;
        console.log(userName);

        await db.update(UserTable).set({
            deleted: true,
            updatedAt: sql`NOW()`
        }).where(
            eq(UserTable.name, userName)
        )

    } catch (error) {
        console.error(error);
        resp.error = true;
        resp.message = error as string;
    }

    const response = NextResponse.json(resp, {status: resp.error ? 400 : 200});
    response.cookies.set("auth_token", "", {maxAge: 0});

    return response;
}