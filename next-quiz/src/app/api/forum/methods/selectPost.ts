import { db } from "@/drizzle/db";
import { ForumCommentTable, ForumPostTable, UserTable } from "@/drizzle/schema";
import { forumCommentData } from "@/utils/types/forumCommentData.type";
import { forumPostData } from "@/utils/types/forumPostData.type";
import { eq, desc, and, asc } from "drizzle-orm";

export default async function selectPost(id: string | null) {
    let queryResult: forumPostData[] | {
            postData: forumPostData,
            commentData: forumCommentData[]
        } = [];

    if (id === null) {
        queryResult = await db.select({
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
    }

    if (id !== null) {
        const postQuery = await db.select({
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
            and(
                eq(ForumPostTable.deleted, false),
                eq(ForumPostTable.id, id)
            )
        ).orderBy(desc(ForumPostTable.createdAt)).limit(20)

        const commentQuery = await db.select({
            id: ForumCommentTable.id,
            user: UserTable.name,
            text: ForumCommentTable.comment,
            answerTo: ForumCommentTable.answerTo,
            createdAt: ForumCommentTable.createdAt
        }).from(ForumCommentTable).innerJoin(
            UserTable,
            eq(ForumCommentTable.userId, UserTable.id)
        ).where(
            eq(ForumCommentTable.forumId, id)
        ).orderBy(asc(ForumCommentTable.createdAt))

        queryResult = {
            postData: postQuery[0],
            commentData: commentQuery
        }
    }

    return queryResult;
}