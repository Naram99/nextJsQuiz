import {NextResponse} from "next/server";

export async function POST(req: Request) {
    // TODO: Guest game join
    const data = await req.json();
    return NextResponse.json(data, {status: 200});
}