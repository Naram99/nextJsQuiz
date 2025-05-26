"use client";

import { useUser } from "@/context/UserContext";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

export default function SkinQuizGamePage() {
    const me = useUser();

    const params = useParams();
    const id = params.id as string;

    return (
        <div className={styles.pageWrapper}>
            <h1>
                SkinQuizPage, {id}, {me?.name}
            </h1>
            ;
        </div>
    );
}
