import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import sendRequest from "./sendRequest";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    const data = await req.json();
    const resp = {
        error: false,
        message: "",
    };

    try {
        if (!token) throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const userId = decodedToken.payload.id as string;

        if (data.id) await sendRequest(userId, data.id);
        else throw new Error("Wrong request!");
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, { status: resp.error ? 400 : 201 });
}
