import styles from "./page.module.css"
import {useEffect} from "react";

export default function FriendList() {
    // TODO: Get friends data from db.
    // TODO: Get friend requests from db.
    useEffect(() => {
        async function getFriends() {
            const resp = await fetch("/api/friends", {
                method: "GET",
                credentials: "include"
            });
            console.log(resp)
        }
        getFriends().then();
    }, []);
    return (
        <div className={styles.friendList}>Friend List</div>
    )
}