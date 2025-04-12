import {forumPostData} from "@/utils/types/forumPostData.type";
import styles from "./page.module.css";

export default function ForumPost({data}: {data: forumPostData }) {
    return (
        <div className={styles.forumPostCt}>
            <div className={styles.forumPostTitle}>{data.title}</div>
            <div className={styles.forumPostDescription}>{data.description}</div>
        </div>
    )
}