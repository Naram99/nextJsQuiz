"use client";

import styles from "@/app/[user]/profile/page.module.css";

export default function RequestCard({username}: {username: string}) {
    return <div className={styles.requestCardCt}>
        <div className={styles.requestName}>{username}</div>
        <div className={styles.requestActionBtns}>
            <div className={styles.requestAccept}>{/* TODO: Friends texts */}</div>
            <div className={styles.requestDeny}>{/* TODO: Friends texts */}</div>
        </div>
    </div>
}