"use client"
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "@/app/[user]/LanguageSelector";
import {useContext} from "react";
import {LanguageContext} from "@/context/LanguageContext";

export default function Home() {
    const {texts} = useContext(LanguageContext)!;
    const loginText = texts.loginTexts!;
    return (
        <div className={styles.main}>
            <LanguageSelector />
            <div className={styles.logoCt} >
                <div className={styles.logo}>
                    <Image src="/logoWhite.png" alt="DRV Logo" width={200} height={200}/>
                </div>
                {/* TODO: Main page welcome text */}
            </div>
            <div className={styles.mainBtnCt}>
                <Link href="/login" className={styles.mainBtn}>{loginText.login}</Link>
            </div>
        </div>
    );
}

