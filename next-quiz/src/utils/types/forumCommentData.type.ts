export type forumCommentData = {
    id: string,
    user: string,
    text: string,
    answerTo: string | null,
    createdAt: Date
}