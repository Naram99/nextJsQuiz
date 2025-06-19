import { NextResponse } from "next/server";
import getChampions from "./getChampions";

export async function GET() {
    const resp = {
        error: false,
        message: "",
        data: [] as string[]
    }

    try {
        const champs = await getChampions();
        resp.data = champs.map(champ => champ.champion);
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
        resp.data = [] as string[]
    }

    return NextResponse.json(resp, { status: resp.error ? 500 : 200 });
}