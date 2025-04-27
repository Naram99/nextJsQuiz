import {cookies} from "next/headers";
import {chatFriend} from "@/utils/types/chatFriend.type";
import {NextResponse} from "next/server";
import chatFriendSelect from "@/app/api/chat/methods/chatFriendSelect";
import {jwtVerify} from "jose";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const resp: {error: boolean, message: string, data: chatFriend[]} = {
        error: false,
        message: "",
        data: []
    }

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const username = decodedToken.payload.username as string;

        resp.data = await chatFriendSelect(username);
        console.log(resp.data)
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: resp.error ? 400 : 200});
}