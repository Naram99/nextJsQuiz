"use client";

import styles from "./page.module.css";
import React, {useEffect, useState} from "react";
import {forumPostData} from "@/utils/types/forumPostData.type";
import ForumPost from "@/app/[user]/forum/ForumPost";
import {useRouter} from "next/navigation";

export default function ForumPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<forumPostData[]>([])

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

    return (
        <div className={styles.postListCt}>
            <div className={styles.postList}>
                {posts.map((post) => (
                    <div key={post.id} id={post.id} onClick={handlePostClick}>
                        <ForumPost data={post} />
                    </div>
                ))}
            </div>
        </div>
    )
}