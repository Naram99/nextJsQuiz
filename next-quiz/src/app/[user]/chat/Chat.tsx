"use client";

import styles from "./page.module.css";
import InputGroup from "@/components/InputGroup";
import React, { useContext, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { socket } from "@/socket/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";
import { chatMessage } from "@/utils/types/chatMessage.type";

export default function Chat({
    selected,
    messages,
    name,
}: {
    selected: string;
    messages: chatMessage[];
    name: string;
}) {
    const { texts } = useContext(LanguageContext)!;
    const chatText = texts.chatTexts!;

    const [newMessage, setNewMessage] = useState("");
    const [rename, setRename] = useState(false);
    const [newName, setNewName] = useState("");

    function handleRename() {
        setRename(true);
        setNewName(name);
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewName(e.target.value);
    }

    async function handleNameSubmit() {
        const resp = await fetch("/api/chat", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({ id: selected, name: newName }),
        });

        if (resp.ok) setRename(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewMessage(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement> | React.MouseEvent) {
        e.preventDefault();
        if (newMessage.trim().length > 0) {
            socket.emit("chatMessage", newMessage, selected);
            setNewMessage("");
        }
    }

    // TODO: Filter messages with room id

    //Bug: Default all chat does not appear on page

    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatTitleCt}>
                {rename ? (
                    <>
                        <InputGroup
                            title={chatText.roomRename}
                            id={"rename"}
                            inputType={"text"}
                            onChange={handleNameChange}
                            value={newName}
                        />
                        <button
                            type={"button"}
                            className={styles.sendMessageBtn}
                            onClick={handleNameSubmit}
                        >
                            {chatText.renameBtn}
                        </button>
                    </>
                ) : (
                    <>
                        <div className={styles.chatTitle}>{name}</div>
                        <div className={styles.chatRenameIcon} onClick={handleRename}>
                            <FontAwesomeIcon icon={faPen} />
                        </div>
                    </>
                )}
            </div>
            <div className={styles.messagesWrapper}>
                <div className={styles.chatCt}>
                    {messages.map((msg, index) => (
                        <div key={index} className={styles.message}>
                            <Message msg={msg.message} sender={msg.sender} />
                        </div>
                    ))}
                </div>
                <div className={styles.chatMessageCt}>
                    <form className={styles.chatMessage} onSubmit={handleSubmit}>
                        <InputGroup
                            title={chatText.placeholder}
                            id={"comment"}
                            inputType={"text"}
                            onChange={handleChange}
                            value={newMessage}
                        />
                        <button
                            type={"button"}
                            className={styles.sendMessageBtn}
                            onClick={handleSubmit}
                        >
                            {chatText.send}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
