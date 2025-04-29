"use client";

import React, {useEffect, useState} from "react";
import styles from "./page.module.css";
import ChatSelector from "@/app/[user]/chat/ChatSelector";
import {chatFriend} from "@/utils/types/chatFriend.type";
import Chat from "@/app/[user]/chat/Chat";
import {socket} from "@/socket/socket";

export default function ChatPage() {
    const [selected, setSelected] = useState("all");
    const [friends, setFriends] = useState<chatFriend[]>([]);
    const [messages, setMessages] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        const handleChatMessage = (msg: string, room: string) => {
            setMessages(prevMessages => [...prevMessages, { message: msg, room: room }]);
        };

        socket.on("chatMessage", handleChatMessage);

        return () => {
            socket.off("chatMessage", handleChatMessage);
        };
    }, []);

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
            <h1 className={styles.mainTitle}>Chat</h1>
            <div className={styles.chatLayoutCt}>
                <ChatSelector friends={friends} onSelect={handleSelect} />
                <Chat selected={selected} messages={messages} />
            </div>
        </div>
    );
}
