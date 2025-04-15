"use client";

import { forumPostData } from "@/utils/types/forumPostData.type";
import { useParams } from "next/navigation";
import {useContext, useEffect, useState} from "react";
import styles from "./page.module.css";
import { forumCommentData } from "@/utils/types/forumCommentData.type";
import Comment from "./Comment";
import {LanguageContext} from "@/context/LanguageContext";

type postState = {
    postData: forumPostData,
    commentData: forumCommentData[]
}


export default function ForumPostPage() {
    const params = useParams();
    const id = params.id;

    const { texts } = useContext(LanguageContext)!;
    const forumText = texts.forumTexts!;

    const [data, setData] = useState<postState>({
        postData: {
            id: "", 
            title: "", 
            description: "", 
            pictures: "", 
            createdBy: "", 
            createdAt: new Date(),
            updatedAt: new Date(),
            creator: ""
        },
        commentData: []
    });

    useEffect(() => {
        async function getData() {
            const postsResp = await fetch(`/api/forum?id=${id}`, {
                method: "GET",
                credentials: "include"
            });

            // TODO: fetch to get comments

            const respData = await postsResp.json();
            setData(respData.data)
        }

        getData().then()
    }, [])

    // TODO: Sort comments with answers

    return (
        <div className={styles.forumPostCt}>
            <div className={styles.forumPostTitleCt}>
                <div className={styles.forumPostTitle}>{data.postData.title}</div>
                <div className={styles.forumPostInfo}>
                    {`${data.postData.creator}, ${data.postData.createdAt}`}
                </div>
            </div>
            <div className={styles.forumPostBody}>
                <div className={styles.forumPostDescription}>{data.postData.description}</div>
                <div className={styles.forumPostPictures}></div>
                <div className={styles.forumPostCommentsCt}>
                    <div className={styles.commentsTitle}>{forumText.comments}</div>
                    {data.commentData.map(comment => (
                        <div key={comment.id}>
                            <Comment data={comment} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}