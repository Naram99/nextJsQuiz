import styles from "./page.module.css";
import Image from "next/image";
import React from "react";

export default function ProfileDisplay(props: {
    userdata: {
        id: string;
        name: string;
        email: string;
        phone: string;
        profilePicture: string;
    }
}) {
    return (
        <>
            <Image
                src={`/users/${props.userdata.name}/public/${props.userdata.profilePicture}`}
                alt={`${props.userdata.name} profile picture`}
                className={styles.profilePicture}
                width={50}
                height={50}
            />
            <div className={styles.profileName}>{props.userdata.name}</div>
            <div className={styles.profileId}>{props.userdata.id}</div>
            <div className={styles.profileMail}>{props.userdata.email}</div>
            <div className={styles.profilePhone}>{props.userdata.phone}</div>
        </>
    )
}