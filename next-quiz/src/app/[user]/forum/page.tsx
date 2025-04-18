"use client";

import styles from "./page.module.css";
import React, {useContext, useEffect, useState} from "react";
import {forumPostData} from "@/utils/types/forumPostData.type";
import ForumPost from "@/app/[user]/forum/ForumPost";
import {useRouter} from "next/navigation";
import { LanguageContext } from "@/context/LanguageContext";
import PopupModal from "@/components/modal/PopupModal";
import NewForumPostBody from "@/components/modal/NewForumPostBody";

export default function ForumPage() {
    const { texts } = useContext(LanguageContext)!;
    const forumText = texts.forumTexts!;

    const router = useRouter();
    const [posts, setPosts] = useState<forumPostData[]>([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPostData, setNewPostData] = useState({
        title: "",
        description: "",
        type: "post"
    })

    useEffect(() => {
        async function getPosts() {
            const resp = await fetch("/api/forum", {
                method: "GET",
                credentials: "include"
            })

            const data = await resp.json()

            setPosts(data.data);
            console.log(posts);
        }

        getPosts().then();
    }, []);

    function handlePostClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        router.push(`forum/${e.currentTarget.id}`);
    }

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleDataChange(
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        setNewPostData({
            ...newPostData, [e.target.id]: e.target.value
        })
    }

    async function handlePublish() {
        const resp = await fetch("/api/forum", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(newPostData),
        })
        if (resp.ok) {
            closeModal();
            location.reload();
        }
    }

    return (
        <div className={styles.forumPageWrapper}>
            <div className={styles.titleCt}>
                <h1 className={styles.title}>{forumText.title}</h1>
                <button
                    className={styles.newPostBtn}
                    onClick={handleModalOpen}
                >{forumText.newPost}</button>
            </div>
            <div className={styles.postListCt}>
                <div className={styles.postList}>
                    {posts.map((post) => (
                        <div key={post.id} id={post.id} onClick={handlePostClick}>
                            <ForumPost data={post} />
                        </div>
                    ))}
                </div>
            </div>
            <PopupModal isOpen={isModalOpen} onclose={closeModal}>
                <NewForumPostBody
                    text={forumText.newPostTitle}
                    publish={forumText.publish}
                    dataChange={handleDataChange}
                    data={newPostData}
                    onPublish={handlePublish}
                />
            </PopupModal>
        </div>
    )
}