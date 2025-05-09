import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import chatRoomCreate from "./chatRoomCreate";

export async function POST(req:Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    const resp: { error: boolean; message: string } = {
        error: false,
        message: "",
    };

    const data = await req.json();

    try {
        if (!token) throw new Error("Unauthorized");

        if (data.length === 0) throw new Error("Cannot create empty room!");

        await chatRoomCreate(data);
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
        console.error(error);
    }

    return NextResponse.json(resp, { status: resp.error ? 400 : 201 });
}