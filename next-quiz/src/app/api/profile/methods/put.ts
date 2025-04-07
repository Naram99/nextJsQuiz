import {NextResponse} from "next/server";

export async function PUT(req: Request) {
    const data = await req.json();
    const resp = {
        error: false,
        message: "",
        user: ""
    }
    console.log(data);
    // TODO: Update profile

    return NextResponse.json(resp, {status: 200});
}