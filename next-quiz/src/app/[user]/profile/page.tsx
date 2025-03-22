"use client"

import React, {useEffect, useState} from "react";
import styles from "./page.module.css";

const ProfilePage: React.FC = () => {
    const [userData, setUserData] = useState({});
    useEffect(() => {
        async function getUserData() {
            const userDataGet = await fetch("/api/profile", {
                method: "GET",
                credentials: "include",
            })
            if (userDataGet.ok) {
                const dataObj = await userDataGet.json();
                setUserData(dataObj.data);
            }
        }
        getUserData().then();
    }, []);

    console.log(userData);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <div className={styles.profileCt}>
            <div className={styles.dataFormCt}>
                <form onSubmit={handleSubmit}></form>
            </div>
        </div>
    )
}

export default ProfilePage;