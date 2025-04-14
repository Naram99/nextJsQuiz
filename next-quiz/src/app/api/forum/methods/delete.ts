import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {jwtVerify} from "jose";
import selectPostOwner from "@/app/api/forum/methods/selectPostOwner";
import {db} from "@/drizzle/db";
import {ForumPostTable} from "@/drizzle/schema/forumpost";

export async function DELETE(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    const data = await req.json();
    const resp = {
        error: false,
        message: "",
    }

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const username = decodedToken.payload.username as string;
        const role = decodedToken.payload.role as string;

        const post = await selectPostOwner(data.id);

        if (!post || post.length !== 1)
            throw new Error("Invalid request");

        if (post[0].owner !== username || role !== "admin")
            throw new Error("Cannot delete this post.");

        await db.update(ForumPostTable).set({deleted: true});
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: resp.error ? 401 : 200});
}