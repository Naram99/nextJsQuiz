"use client";

import React, {useEffect, useState} from "react";
import styles from "./page.module.css";
import ChatSelector from "@/app/[user]/chat/ChatSelector";
import {chatFriend} from "@/utils/types/chatFriend.type";
import Chat from "@/app/[user]/chat/Chat";

export default function ChatPage() {
    const [selected, setSelected] = useState("");
    const [friends, setFriends] = useState<chatFriend[]>([]);

    useEffect(() => {
        async function getFriends() {
            const resp = await fetch("/api/chat", {
                method: "GET",
                credentials: "include"
            })

            if (resp.ok) {
                const data = await resp.json();
                setFriends(data.data);
            }
        }

        getFriends().then()
    }, [])

    function handleSelect(id: string) {
        setSelected(id);
        console.log(id);
    }

    return (
        <div className={styles.mainCt}>
            <h1>Chat Layout</h1>
            <ChatSelector friends={friends} onSelect={handleSelect} />
            <Chat selected={selected} />
        </div>
    );
}
