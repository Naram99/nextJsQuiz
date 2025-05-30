"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { LanguageContext } from "@/context/LanguageContext";
import ProfileEditor from "@/app/[user]/profile/ProfileEditor";
import FriendList from "@/app/[user]/profile/FriendList";
import PopupModal from "@/components/modal/PopupModal";
import DeleteModalBody from "@/components/modal/DeleteModalBody";
import { useRouter } from "next/navigation";
import ProfileDisplay from "@/app/[user]/profile/ProfileDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ProfilePage: React.FC = () => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        id: "",
        email: "",
        phone: "",
        profilePicture: "",
    });
    useEffect(() => {
        async function getUserData() {
            const userDataGet = await fetch("/api/profile", {
                method: "GET",
                credentials: "include",
            });

            if (userDataGet.ok) {
                const dataObj = await userDataGet.json();
                console.log(dataObj);
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

    const { texts } = useContext(LanguageContext)!;
    const profileText = texts.profileTexts!;

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
            });

            if (resp.ok) router.push("/login");
        }
    }

    return (
        <div className={styles.profileCt}>
            <div className={styles.profileDataCt}>
                <ProfileDisplay userdata={userData} handleUpdate={handleUpdate} />
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
            <button className={styles.deleteProfileBtn} onClick={handleModalOpen}>
                {profileText.delete}
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <PopupModal isOpen={isModalOpen} onclose={closeModal}>
                <DeleteModalBody
                    text={profileText.deleteWarning}
                    confirm={profileText.deleteConfirm}
                    deny={profileText.deleteDeny}
                    onChoice={handleChoice}
                />
            </PopupModal>
        </div>
    );
};

export default ProfilePage;
