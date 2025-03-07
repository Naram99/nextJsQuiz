import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    // TODO: login handling
    return NextResponse.json(data);
}