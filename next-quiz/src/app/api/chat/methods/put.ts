import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import nameChange from "./nameChange";

export async function PUT(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    const resp: { error: boolean; message: string } = {
        error: false,
        message: "",
    };

    const data = await req.json();

    try {
        if (!token) throw new Error("Unauthorized");
        if (data.id === "all") throw new Error("Cannot rename all chat!");

        await nameChange(data.id, data.name);
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
        console.error(error);
    }

    return NextResponse.json(resp, { status: resp.error ? 400 : 200 });
}
