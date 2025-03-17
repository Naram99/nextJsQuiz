import {NextResponse} from "next/server";

export async function POST() {
    const response = NextResponse.json({message: "Successful logout"}, {status: 200});
    response.cookies.set("auth_token", "", {maxAge: 0});

    return response;
}