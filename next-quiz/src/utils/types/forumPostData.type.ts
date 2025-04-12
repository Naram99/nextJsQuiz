export type forumPostData = {
    id: string;
    title: string;
    description: string | null;
    pictures: unknown;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    creator: string;
}