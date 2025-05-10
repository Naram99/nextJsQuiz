import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getMessages from "./getMessages";
import { chatMessage } from "@/utils/types/chatMessage.type";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    const resp: { error: boolean; message: string; data: chatMessage[] } = {
        error: false,
        message: "",
        data: [],
    };

    const data = await req.json();

    try {
        if (!data.room) throw new Error("Wrong request!");
        if (!token) throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token.value, secret);

        resp.data = await getMessages(data.room);
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, { status: resp.error ? 400 : 200 });
}
