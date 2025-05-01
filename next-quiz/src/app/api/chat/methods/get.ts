import {cookies} from "next/headers";
import {chatRoom} from "@/utils/types/chatRoom.type";
import {NextResponse} from "next/server";
import chatRoomSelect from "@/app/api/chat/methods/chatRoomSelect";
import {jwtVerify} from "jose";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const resp: {error: boolean, message: string, data: chatRoom[]} = {
        error: false,
        message: "",
        data: []
    }

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const userId = decodedToken.payload.id as string;        

        resp.data = await chatRoomSelect(userId);
        console.log(resp.data)
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
        console.error(error);
    }

    return NextResponse.json(resp, {status: resp.error ? 400 : 200});
}