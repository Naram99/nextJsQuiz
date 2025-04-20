import styles from "./page.module.css";
import Image from "next/image";
import React, {useContext} from "react";
import {LanguageContext} from "@/context/LanguageContext";

export default function ProfileDisplay(props: {
    userdata: {
        id: string;
        name: string;
        email: string;
        phone: string;
        profilePicture: string;
    },
    handleUpdate: () => void,
}) {
    const {texts} = useContext(LanguageContext)!;
    const profileText = texts.profileTexts!;

    return (
        <>
            <div className={styles.imageCt}>
                <Image
                    src={`/users/${props.userdata.name}/public/${props.userdata.profilePicture}`}
                    alt={`${props.userdata.name} profile picture`}
                    className={styles.profilePicture}
                    width={50}
                    height={50}
                />
            </div>
            <div className={styles.textDataCt}>
                <div className={styles.profileName}>{props.userdata.name}</div>
                <div className={styles.profileId}>{props.userdata.id}</div>
                <div className={styles.profileMail}>{props.userdata.email}</div>
                <div className={styles.profilePhone}>{props.userdata.phone}</div>
                <button
                    type={"button"}
                    className={styles.updateBtn}
                    onClick={props.handleUpdate}>{profileText.update}</button>
            </div>
        </>
    )
}