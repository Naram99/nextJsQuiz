"use client"

import React, {useContext, useEffect, useState} from "react";
import styles from "./page.module.css";
import {LanguageContext} from "@/context/LanguageContext";
import Image from "next/image";
import ProfileEditor from "@/app/[user]/profile/ProfileEditor";
import FriendList from "@/app/[user]/profile/FriendList";

const ProfilePage: React.FC = () => {
    const [update, setUpdate] = useState(false);
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        profilePicture: ""
    });
    useEffect(() => {
        async function getUserData() {
            const userDataGet = await fetch("/api/profile", {
                method: "GET",
                credentials: "include",
            })
            // TODO: Userdata is not set correctly
            if (userDataGet.ok) {
                const dataObj = await userDataGet.json();
                Object.entries(dataObj.data).forEach(([key, value]) => {
                    setUserData({...userData, [key]: value});
                })
            }
        }
        getUserData().then();
    }, []);
    console.log(userData);

    const {texts} = useContext(LanguageContext)!;
    const profileText = texts.loginTexts!;

    function handleUpdate() {
        setUpdate(!update);
    }

    return (
        <div className={styles.profileCt}>
            <div className={styles.profileDataCt}>
                <Image
                    src={`/users/${userData.name}/public/${userData.profilePicture}`}
                    alt={`${userData.name} profile picture`}
                    className={styles.profilePicture}
                    width={50}
                    height={50}
                />
                <div className={styles.profileName}>{userData.name}</div>
                <div className={styles.profileMail}>{userData.email}</div>
                <div className={styles.profilePhone}>{userData.phone}</div>
                <button
                    type={"button"}
                    className={styles.updateBtn}
                    onClick={handleUpdate}>{/* TODO: ProfileTexts */}Update profile</button>
            </div>
            {update && (
                <div className={styles.dataFormCt}>
                    <ProfileEditor
                        id={userData.id}
                        username={userData.name}
                        email={userData.email}
                        phone={userData.phone}
                        profilePic={userData.profilePicture}
                    />
                </div>
            )}
            <div className={styles.friendsCt}>
                <FriendList />
            </div>
            {/* TODO: Delete user */}
        </div>
    )
}

export default ProfilePage;