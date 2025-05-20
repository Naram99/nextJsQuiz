import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    const resp: { error: boolean; message: string; user: { id: string; name: string } } = {
        error: false,
        message: "",
        user: {
            id: "",
            name: "",
        },
    };

    try {
        if (!token) throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const userData = await jwtVerify(token.value, secret);

        resp.user.id = userData.payload.id as string;
        resp.user.name = userData.payload.username as string;
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
        console.error(error);
    }

    return NextResponse.json(resp, { status: resp.error ? 400 : 200 });
}
