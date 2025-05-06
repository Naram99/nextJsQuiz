"use client";

import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { friendData } from "@/utils/types/friendData.type";
import FriendCard from "@/app/[user]/profile/FriendCard";
import RequestCard from "@/app/[user]/profile/RequestCard";
import { LanguageContext } from "@/context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import PopupModal from "@/components/modal/PopupModal";
import SearchSingleUserModalBody from "@/components/modal/SearchSingleUserModalBody";

export default function FriendList({ username }: { username: string }) {
    const { texts } = useContext(LanguageContext)!;
    const profileText = texts.profileTexts!;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRequests, setShowRequests] = useState(false);
    const [loading, setLoading] = useState(true);
    const [friendsData, setFriendsData] = useState<friendData>({
        accepted: [],
        requests: [],
    });
    useEffect(() => {
        async function getFriends() {
            const resp = await fetch("/api/friends", {
                method: "GET",
                credentials: "include",
            });
            const respData = await resp.json();
            setFriendsData(respData.data as friendData);
            setLoading(false);
        }
        getFriends().then();
    }, []);
    console.log(friendsData);

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div className={styles.friendList}>
            <button
                className={showRequests ? styles.pagesBtn : styles.pagesBtnActive}
                onClick={() => setShowRequests(false)}
            >
                {profileText.acceptedFriends}
            </button>
            <button
                className={showRequests ? styles.pagesBtnActive : styles.pagesBtn}
                onClick={() => setShowRequests(true)}
            >
                {profileText.requestedFriends}
            </button>
            {showRequests ? (
                <div className={styles.requestedFriends}>
                    <div className={styles.requestedFriendsList}>
                        {!loading &&
                            friendsData.requests.map((user) => (
                                <div key={user.id} className={styles.requestCardWrapper}>
                                    <RequestCard username={user.initiator} id={user.id} />
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <div className={styles.acceptedFriends}>
                    <div className={styles.acceptedFriendsList}>
                        {!loading &&
                            friendsData.accepted.map((friend, index) => (
                                <div key={index} className={styles.friendCardWrapper}>
                                    <FriendCard
                                        username={
                                            friend.initiator === username
                                                ? friend.target
                                                : friend.initiator
                                        }
                                        since={friend.since}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            )}

            <div className={styles.searchUsers}>
                {/* TODO: Search other users */}
                <button className={styles.addFriendBtn} onClick={handleModalOpen}>
                    {profileText.addFriend}
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            </div>
            <PopupModal isOpen={isModalOpen} onclose={closeModal}>
                <SearchSingleUserModalBody />
            </PopupModal>
        </div>
    );
}
