import {NextResponse} from "next/server";
import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import {eq} from "drizzle-orm";
import {jwtVerify} from "jose";
import {cookies} from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const resp = {
        error: false,
        message: "",
        data: {}
    }

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const userName = decodedToken.payload.username as string;
        console.log(userName);

        const queryResult = await db.select({
            id: UserTable.id,
            userName: UserTable.name,
            email: UserTable.email,
            phone: UserTable.phone,
            profilePicture: UserTable.profilePicture,
        }).from(UserTable).where(
            eq(UserTable.name, userName)
        )
        console.log(queryResult)
        if (queryResult.length !== 1) {
            throw new Error('Database error');
        }

        resp.data = queryResult[0];
        console.log(resp)

    } catch (error) {
        console.log(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: resp.error ? 401 : 200});
}