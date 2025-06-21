import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import selectQuiz from "./selectQuiz";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    const data = await req.json();
    const resp = {
        error: false,
        message: "",
        data: [] as { id: string; title: string }[],
    };

    try {
        if (!token) throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const userId = decodedToken.payload.id as string;

        if (userId) resp.data = await selectQuiz(data.id);
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
        resp.data = [];
    }

    return NextResponse.json(resp, { status: resp.error ? 400 : 200 });
}
