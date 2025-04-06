"use client"

import React, {useContext, useEffect, useState} from "react";
import styles from "./page.module.css";
import {LanguageContext} from "@/context/LanguageContext";
import Image from "next/image";
import ProfileEditor from "@/app/[user]/profile/ProfileEditor";
import FriendList from "@/app/[user]/profile/FriendList";
import PopupModal from "@/components/modal/PopupModal";
import DeleteModalBody from "@/components/modal/DeleteModalBody";
import {useRouter} from "next/navigation";

const ProfilePage: React.FC = () => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
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

            if (userDataGet.ok) {
                const dataObj = await userDataGet.json();
                console.log(dataObj)
                setUserData({
                    id: dataObj.data.id ?? "",
                    name: dataObj.data.userName ?? "",
                    email: dataObj.data.email ?? "",
                    phone: dataObj.data.phone ?? "",
                    profilePicture: dataObj.data.profilePicture ?? "",
                });
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

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    async function handleChoice(choice: boolean) {
        closeModal();
        if (choice) {
            const resp = await fetch("/api/profile", {
                method: "DELETE",
                credentials: "include",
            })

            if (resp.ok)
                router.push("/login");
        }
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
                <FriendList username={userData.name} />
            </div>
            {/* TODO: Delete user, popup modal */}
            <button className={styles.deleteProfileBtn} onClick={handleModalOpen}>
                {/* TODO: Friends texts */}Delete
            </button>
            <PopupModal isOpen={isModalOpen} onclose={closeModal}>
                <DeleteModalBody
                    text={"This is not reversible."}
                    confirm={"Delete"}
                    deny={"Cancel"}
                    onChoice={handleChoice}
                />
            </PopupModal>
        </div>
    )
}

export default ProfilePage;