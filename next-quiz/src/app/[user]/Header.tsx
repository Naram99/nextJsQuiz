"use client";
import Image from "next/image";
import styles from "./page.module.css";
import logo from "../../../public/logoWhite.png";

const Header = ({ username }: { username: string }) => {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.logoCt}>
                <Image src={logo} alt="DRV logo" className={styles.logo} />
            </div>
            <div className={styles.headerMessageCt}></div>
            <div className={styles.navCt}>
                <nav className={styles.navbar}>
                    <a href="/dashboard">Irányítópult</a>
                    <a href="/help">Súgó</a>
                    <a href="/profile">{username}</a>
                </nav>
            </div>
        </div>
    );
};

export default Header;
