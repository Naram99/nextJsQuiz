"use client";

import styles from "@/app/[user]/profile/page.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faX} from "@fortawesome/free-solid-svg-icons";

export default function RequestCard({username}: {username: string}) {
    return <div className={styles.requestCardCt}>
        <div className={styles.requestName}>{username}</div>
        <div className={styles.requestActionBtns}>
            <div className={styles.requestAccept}>
                {/* TODO: Friends texts */}
                <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className={styles.requestDeny}>
                {/* TODO: Friends texts */}
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    </div>
}