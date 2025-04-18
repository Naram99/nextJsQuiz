"use client";

import { forumPostData } from "@/utils/types/forumPostData.type";
import { useParams } from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import styles from "./page.module.css";
import { forumCommentData } from "@/utils/types/forumCommentData.type";
import Comment from "./Comment";
import {LanguageContext} from "@/context/LanguageContext";
import InputGroup from "@/components/InputGroup";

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

    const [newPostData, setNewPostData] = useState({
        forumId: id,
        comment: "",
        answerTo: null,
        type: "comment",
    })

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

    function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPostData({
            ...newPostData, [e.target.id]: e.target.value
        })
    }

    // TODO: handleAnswerClick

    async function handleSubmit() {
        if (newPostData.comment !== "") {
            const resp = await fetch("/api/forum", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(newPostData)
            })
            if (resp.ok) location.reload();
        }
    }

    return (
        <>
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
            <div className={styles.forumCommentCt}>
                <div className={styles.forumComment}>
                    <InputGroup
                        title={forumText.doComment}
                        id={"comment"}
                        inputType={"text"}
                        onChange={handleCommentChange}
                        value={newPostData.comment} />
                    <button
                        type={"button"}
                        className={styles.sendCommentBtn}
                        onClick={handleSubmit}
                    >
                        {forumText.send}
                    </button>
                </div>
            </div>
        </>
    )
}