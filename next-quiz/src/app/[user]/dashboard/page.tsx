"use client";

import styles from "./page.module.css";
import MainCard from "./MainCard";
import {useContext} from "react";
import { LanguageContext } from "@/context/LanguageContext";

const Dashboard = () => {
    const { texts } = useContext(LanguageContext)!;
    const cardText = texts.cardTexts!;

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.cardsCt}>
                {Object.entries(cardText).map(([key, card]) => (
                    <div className={styles.card} key={key}>
                        <MainCard {...card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
