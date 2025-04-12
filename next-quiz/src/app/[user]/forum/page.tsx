"use client";

import styles from "./page.module.css";
import {useState} from "react";
import {forumPostData} from "@/utils/types/forumPostData.type";
import ForumPost from "@/app/[user]/forum/ForumPost";

export default function ForumPage() {
    const [posts, setPosts] = useState<forumPostData[]>([])
    // TODO: fetch get posts

    return (
        <div className={styles.postListCt}>
            <div className={styles.postList}>
                {posts.map((post) => (
                    <div key={post.id}>
                        <ForumPost data={post} />
                    </div>
                ))}
            </div>
        </div>
    )
}