"use client"

import React, {useContext, useEffect, useState} from "react";
import styles from "./page.module.css";
import InputGroup from "@/components/InputGroup";
import {LanguageContext} from "@/context/LanguageContext";
import Image from "next/image";

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

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const [name, value] = e.target.value;
        setUserData({...userData, [name]: value});
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <div className={styles.profileCt}>
            <div className={styles.profileDataCt}>
                <Image
                    src={userData.profilePicture}
                    alt={`${userData.name} profile picture`}
                    className={styles.profilePicture}
                />
                <div className={styles.profileName}>{userData.name}</div>
                <div className={styles.profileMail}>{userData.email}</div>
                <div className={styles.profilePhone}>{userData.phone}</div>
                <button
                    type={"button"}
                    className={styles.updateBtn}
                    onClick={handleUpdate}>{/* TODO: ProfileTexts */}</button>
            </div>
            <div className={styles.dataFormCt}>

            </div>
        </div>
    )
}

export default ProfilePage;