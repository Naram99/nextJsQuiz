"use client";

import styles from "./page.module.css";

export default function FriendCard({username, since}: {username: string; since: string}) {
    return <div className={styles.friendCardCt}>
        <div className={styles.friendName}>{username}</div>
        <div className={styles.friendSince}>{since}</div>
    </div>
}