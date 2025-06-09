import { SkinData } from "@/utils/types/games/SkinData.type";
import { NextResponse } from "next/server";
import getSkins from "./getSkins";

export async function GET(req: Request) {
    const resp = {
        error: false,
        message: "",
        data: [] as SkinData[]
    }

    try {
        resp.data = await getSkins();
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
        resp.data = [] as SkinData[];
    }

    return NextResponse.json(resp, { status: resp.error ? 500 : 200 });
}