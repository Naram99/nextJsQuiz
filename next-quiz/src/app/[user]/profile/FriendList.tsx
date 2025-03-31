"use client";

import styles from "./page.module.css"
import {useEffect, useState} from "react";
import {friendData} from "@/utils/friendData.type";
import FriendCard from "@/app/[user]/profile/FriendCard";
import RequestCard from "@/app/[user]/profile/RequestCard";

export default function FriendList({username}: {username: string}) {
    const [showRequests, setShowRequests] = useState(false);
    const [loading, setLoading] = useState(true);
    const [friendsData, setFriendsData] = useState<friendData>({
        accepted: [],
        requests: []
    })
    useEffect(() => {
        async function getFriends() {
            const resp = await fetch("/api/friends", {
                method: "GET",
                credentials: "include"
            });
            const respData = await resp.json();
            setFriendsData(respData.data as friendData);
            setLoading(false);
        }
        getFriends().then();
    }, []);
    console.log(friendsData);

    function handleShowRequest() {
        setShowRequests(true);
    }

    function handleHideRequest() {
        setShowRequests(false);
    }

    return (
        <div className={styles.friendList}>
            <button className={styles.pagesBtn} onClick={handleHideRequest}>
                {/* TODO: Friends texts */}Accepted
            </button>
            <button className={styles.pagesBtn} onClick={handleShowRequest}>
                {/* TODO: Friends texts */}Requests
            </button>
            {showRequests ? (
                <div className={styles.requestedFriends}>
                      <div className={styles.sectionTitle}>{/* TODO: Friends texts */}</div>
                      <div className={styles.requestedFriendsList}>
                          {!loading && friendsData.requests.map((user, index) => (
                              <div key={index} className={styles.requestCardWrapper}>
                                  <RequestCard username={user.initiator} />
                              </div>
                          ))}
                      </div>
                </div>
            )
            : (
                <div className={styles.acceptedFriends}>
                    <div className={styles.sectionTitle}>{/* TODO: Friends texts */}</div>
                    <div className={styles.acceptedFriendsList}>
                        {!loading && friendsData.accepted.map((friend, index) => (
                            <div key={index} className={styles.friendCardWrapper}>
                                <FriendCard
                                    username={friend.initiator === username ? friend.target : friend.initiator}
                                    since={friend.since}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.searchUsers}>
                {/* TODO: Search other users */}
            </div>
        </div>
    )
}