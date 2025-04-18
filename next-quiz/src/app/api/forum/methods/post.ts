import {cookies} from "next/headers";
import {jwtVerify} from "jose";
import insertPost from "@/app/api/forum/methods/insertPost";
import insertComment from "@/app/api/forum/methods/insertComment";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const resp: {error: boolean, message: string} = {
        error: false,
        message: "",
    }

    const data = await req.json();

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const username = decodedToken.payload.username as string;

        console.log(data)

        switch (data.type) {
            case "post":
                await insertPost(username, data.title, data.description)
                break;
            case "comment":
                await insertComment(
                    username,
                    data.forumId,
                    data.comment,
                    data.answerTo)
                break;
            default:
                throw new Error("Not valid post data");
        }
    } catch (error) {
        console.error(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: resp.error ? 400 : 201});
}