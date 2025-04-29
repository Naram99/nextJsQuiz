"use client";

import styles from "./page.module.css";
import InputGroup from "@/components/InputGroup";
import React, {useContext, useState} from "react";
import {LanguageContext} from "@/context/LanguageContext";
import {socket} from "@/socket/socket";

export default function Chat(
    {selected, messages}:
    {selected: string, messages: Record<string, string>[]}) {
    const {texts} = useContext(LanguageContext)!;
    const chatText = texts.chatTexts!;

    const [newMessage, setNewMessage] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewMessage(e.target.value);
    }

    function handleSubmit() {
        if (newMessage.trim().length > 0) {
            socket.emit("chatMessage", newMessage, selected);
            setNewMessage("");
        }
    }

    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatCt}>
                {messages.map((msg, index) => (
                    <div key={index} className={styles.message}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className={styles.chatMessageCt}>
                <div className={styles.chatMessage}>
                    <InputGroup
                        title={chatText.placeholder}
                        id={"comment"}
                        inputType={"text"}
                        onChange={handleChange}
                        value={newMessage} />
                    <button
                        type={"button"}
                        className={styles.sendMessageBtn}
                        onClick={handleSubmit}
                    >
                        {chatText.send}
                    </button>
                </div>
            </div>
        </div>
    )
}