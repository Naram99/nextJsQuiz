import {cookies} from "next/headers";
import {jwtVerify} from "jose";
import {NextResponse} from "next/server";

export async function GET() {
    let authenticatedUser = "";
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    let tokenVal = "";

    try {
        if (token) {
            tokenVal = token.value;
        } else {
            throw new Error('Not authenticated');
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(tokenVal, secret);

        if ('username' in decodedToken.payload && decodedToken.payload.username !== "") {
            authenticatedUser = decodedToken.payload.username as string;
        } else {
            throw new Error("Unauthorized");
        }
    } catch (error) {
        console.log(error);
        authenticatedUser = "";
    }

    return NextResponse.json(
        {username: authenticatedUser},
        {status: authenticatedUser === "" ? 401 : 200}
    );
}