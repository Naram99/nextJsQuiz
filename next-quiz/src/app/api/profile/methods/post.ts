import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import searchUsers from "./searchUsers";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");

    const resp = {
        error: false,
        message: "",
        data: [],
    };

    const body = await req.json();
    const search = body.search;

    try {
        if (!token) throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const userId = decodedToken.payload.id as string;

        resp.data = await searchUsers(userId, search);
    } catch (error) {
        console.error(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, { status: resp.error ? 400 : 200 });
}
