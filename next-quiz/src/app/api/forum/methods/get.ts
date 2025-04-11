import {db} from "@/drizzle/db";
import {ForumPostTable} from "@/drizzle/schema/forumpost";
import {UserTable} from "@/drizzle/schema/user";
import {desc, eq} from "drizzle-orm";
import {NextResponse} from "next/server";

type respType = {
    error: boolean;
    message: string;
    data: any[]
}

export async function GET() {
    const resp: respType = {
        error: false,
        message: "",
        data: []
    }

    try {
        resp.data = await db.select({
            ForumPostTable,
            creator: UserTable.name
        }).from(ForumPostTable).innerJoin(
            UserTable,
            eq(ForumPostTable.createdBy, UserTable.id)
        ).where(
            eq(ForumPostTable.deleted, false)
        ).orderBy(desc(ForumPostTable.createdAt)).limit(20);
    } catch (error) {
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, { status: resp.error ? 500 : 200 });
}