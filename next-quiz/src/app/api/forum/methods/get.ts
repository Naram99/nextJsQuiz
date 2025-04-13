import {db} from "@/drizzle/db";
import {ForumPostTable} from "@/drizzle/schema/forumpost";
import {UserTable} from "@/drizzle/schema/user";
import {desc, eq} from "drizzle-orm";
import {NextResponse} from "next/server";
import {forumPostData} from "@/utils/types/forumPostData.type";

type respType = {
    error: boolean;
    message: string;
    data: forumPostData[]
}

export async function GET() {
    const resp: respType = {
        error: false,
        message: "",
        data: []
    }

    try {
        resp.data = await db.select({
            id: ForumPostTable.id,
            title: ForumPostTable.title,
            description: ForumPostTable.description,
            pictures: ForumPostTable.pictures,
            createdBy: ForumPostTable.createdBy,
            createdAt: ForumPostTable.createdAt,
            updatedAt: ForumPostTable.updatedAt,
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

    console.log(resp.data)

    return NextResponse.json(resp, { status: resp.error ? 500 : 200 });
}