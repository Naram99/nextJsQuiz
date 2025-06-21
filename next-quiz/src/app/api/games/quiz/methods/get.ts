import { NextRequest, NextResponse } from "next/server";
import getChampions from "./getChampions";

export async function GET(req: NextRequest) {
    const type = req.nextUrl.searchParams.get("type");
    const resp = {
        error: false,
        message: "",
        data: [] as string[],
    };

    try {
        if (type === "champions") {
            const champs = await getChampions();
            resp.data = champs.map((champ) => champ.champion);
        }
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
        resp.data = [] as string[];
    }

    return NextResponse.json(resp, { status: resp.error ? 500 : 200 });
}
