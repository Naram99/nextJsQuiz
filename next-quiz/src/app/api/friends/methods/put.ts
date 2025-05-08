import { NextResponse } from "next/server";
import friendAccept from "@/app/api/friends/methods/friendAccept";
import friendDeny from "@/app/api/friends/methods/friendDeny";

export async function PUT(req: Request) {
    const data = await req.json();
    const resp = {
        error: false,
        message: "",
    };

    try {
        switch (data.type) {
            case "accept":
                await friendAccept(data.id);
                break;
            case "deny":
                await friendDeny(data.id);
                break;
            default:
                throw new Error("Unknown type " + data.type);
        }
    } catch (error) {
        console.log(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, { status: resp.error ? 400 : 200 });
}
