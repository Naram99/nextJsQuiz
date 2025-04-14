import { forumCommentData } from "@/utils/types/forumCommentData.type";
import styles from "./page.module.css";

export default function Comment({data}: {data: forumCommentData}) {
    return <div className={styles.commentCt}>
        <div className={styles.commentUser}>{data.user}</div>
        <div className={styles.commentText}>{data.text}</div>
    </div>
}