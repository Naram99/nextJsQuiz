import {NextResponse} from "next/server";
import {forumPostData} from "@/utils/types/forumPostData.type";
import { forumCommentData } from "@/utils/types/forumCommentData.type";
import selectPost from "./selectPost";

type respType = {
    error: boolean;
    message: string;
    data: forumPostData[] | {
        postData: forumPostData,
        commentData: forumCommentData[]
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const resp: respType = {
        error: false,
        message: "",
        data: []
    }

    try {
        resp.data = await selectPost(id);

    } catch (error) {
        resp.error = true;
        resp.message = error as string;
    }

    console.log(resp.data)

    return NextResponse.json(resp, { status: resp.error ? 500 : 200 });
}