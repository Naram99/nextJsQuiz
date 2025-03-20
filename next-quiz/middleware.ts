import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {}

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decodedToken;
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: [
        '/*/dashboard',
        '/*/profile',
        '/*/chat',
        '/*/forum',
        '/*/tictactoe',
        '/*/quiz'
    ]
}