import styles from "./page.module.css";
import React, { useContext, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { chatRoom } from "@/utils/types/chatRoom.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchMultiUserModalBody from "@/components/modal/SearchMultiUserModalBody";
import PopupModal from "@/components/modal/PopupModal";

export default function ChatSelector({
    rooms,
    onSelect,
}: {
    rooms: chatRoom[];
    onSelect: (id: string, name: string) => void;
}) {
    const { texts } = useContext(LanguageContext)!;
    const chatText = texts.chatTexts!;

    const listItems: chatRoom[] = [
        { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", names: [chatText.allChat] },
        ...(Array.isArray(rooms) ? rooms : []),
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleNewRoom() {
        setIsModalOpen(true);
    }

    // Future upgrade: Create chat card component.
    return (
        <div className={styles.chatSelectorWrapper}>
            <div className={styles.newRoomBtnCt}>
                <button type="button" className={styles.newRoomBtn} onClick={handleNewRoom}>
                    <FontAwesomeIcon icon={faPlus} />
                    {chatText.newRoom}
                </button>
            </div>
            <div className={styles.chatSelectorCt}>
                {listItems.map((room) => (
                    <div
                        key={room.id}
                        id={room.id}
                        className={styles.chatCard}
                        onClick={() => onSelect(room.id, room.names.join(", "))}
                    >
                        {room.names.join(", ")}
                    </div>
                ))}
            </div>
            <PopupModal isOpen={isModalOpen} onclose={closeModal}>
                <SearchMultiUserModalBody closeModal={closeModal} />
            </PopupModal>
        </div>
    );
}
