import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const resp = {
        error: false,
        message: "",
        data: {}
    }
    // TODO: db query to get data


    return NextResponse.json(req)
}