import styles from "./page.module.css";
import React, {useContext} from "react";
import {LanguageContext} from "@/context/LanguageContext";
import {chatFriend} from "@/utils/types/chatFriend.type";

export default function ChatSelector(
    {friends, onSelect}:
    {friends: chatFriend[], onSelect: (id: string) => void}) {

    const {texts} = useContext(LanguageContext)!;
    const chatText = texts.chatTexts!;

    const listItems: chatFriend[] = [
        {id: "all", name: chatText.allChat},
        ...(Array.isArray(friends) ? friends : []),
    ]

    // Future upgrade: Create chat card component.
    return (
        <div className={styles.chatSelectorCt}>
            {listItems.map((friend) => (
                <div
                    key={friend.id}
                    id={friend.id}
                    className={styles.chatCard}
                    onClick={() => onSelect(friend.id)}
                >
                    {friend.name}
                </div>
            ))}
        </div>
    )
}