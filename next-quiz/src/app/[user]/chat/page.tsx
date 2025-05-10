"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import ChatSelector from "@/app/[user]/chat/ChatSelector";
import { chatRoom } from "@/utils/types/chatRoom.type";
import Chat from "@/app/[user]/chat/Chat";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { LanguageContext } from "@/context/LanguageContext";
import { chatMessage } from "@/utils/types/chatMessage.type";

export default function ChatPage() {
    const { texts } = useContext(LanguageContext)!;
    const chatText = texts.chatTexts!;

    const [selected, setSelected] = useState<string>("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    const [selectedName, setSelectedName] = useState(chatText.allChat);
    const [rooms, setRooms] = useState<chatRoom[]>([]);
    const [messages, setMessages] = useState<chatMessage[]>([]);

    useEffect(() => {
        if (!socket.connected) {
            connectSocketWithFreshToken();
        }

        const handleChatMessage = (msg: string, sender: string, room: string) => {
            if (room === selected) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { message: msg, sender: sender, room: room },
                ]);
            }
        };

        socket.on("chatMessage", handleChatMessage);

        return () => {
            socket.off("chatMessage", handleChatMessage);
        };
    }, [selected]);

    useEffect(() => {
        async function getRooms() {
            const resp = await fetch("/api/chat", {
                method: "GET",
                credentials: "include",
            });

            if (resp.ok) {
                const data = await resp.json();
                setRooms(data.data);
            }
        }

        getRooms().then();
    }, []);

    useEffect(() => {
        async function getMessages() {
            const resp = await fetch("/api/messages", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ room: selected }),
            });

            if (resp.ok) {
                const response = await resp.json();
                setMessages(response.data);
            }
        }

        getMessages().then();
    }, [selected]);

    function handleSelect(id: string, name: string) {
        setSelected(id);
        setSelectedName(name);
        console.log(id);
    }

    return (
        <div className={styles.mainCt}>
            <h1 className={styles.mainTitle}>Chat</h1>
            <div className={styles.chatLayoutCt}>
                <ChatSelector rooms={rooms} onSelect={handleSelect} />
                <Chat selected={selected} messages={messages} name={selectedName} />
            </div>
        </div>
    );
}
