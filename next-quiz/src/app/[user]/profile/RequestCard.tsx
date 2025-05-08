"use client";

import styles from "@/app/[user]/profile/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export default function RequestCard({ username, id }: { username: string; id: string }) {
    async function handleAccept() {
        const resp = await fetch("/api/friends", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({ type: "accept", id: id }),
        });
        if (resp.ok) {
            location.reload();
        }
    }

    async function handleDeny() {
        const resp = await fetch("/api/friends", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ type: "deny", id: id }),
        });
        if (resp.ok) {
            location.reload();
        }
    }

    return (
        <div className={styles.requestCardCt}>
            <div className={styles.requestName}>{username}</div>
            <div className={styles.requestActionBtns}>
                <div className={styles.requestAccept} onClick={handleAccept}>
                    {/* TODO: Friends texts */}
                    <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className={styles.requestDeny} onClick={handleDeny}>
                    {/* TODO: Friends texts */}
                    <FontAwesomeIcon icon={faX} />
                </div>
            </div>
        </div>
    );
}
