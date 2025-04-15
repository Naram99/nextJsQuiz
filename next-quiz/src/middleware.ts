import {jwtVerify} from "jose"; // Needed because of Edge Runtime
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    let tokenVal = "";

    try {
        if (token) {
            tokenVal = token.value;
        } else {
            throw new Error("Unauthorized");
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(tokenVal, secret);
        const username = decodedToken.payload.username as string;

        if (username && username !== "") {
            return NextResponse.next();
        } else {
            throw new Error("Unauthorized");
        }
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/:user/dashboard',
        '/:user/profile',
        '/:user/chat',
        '/:user/forum',
        '/:user/tictactoe',
        '/:user/quiz',
        '/:user/settings',
    ]
}