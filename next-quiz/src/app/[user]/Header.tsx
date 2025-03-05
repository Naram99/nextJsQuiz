"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { notFound, usePathname } from "next/navigation";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

const Header = ({ username }: { username: string | undefined }) => {
    if (!username) {
        notFound();
    }

    const { texts } = useContext(LanguageContext)!;
    const headerText = texts.headerTexts!;

    const pathname: string = usePathname();
    const currentPage = pathname.split("/").pop();

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.logoCt}>
                <Image 
                    src={"/logoWhite.png"} 
                    alt="DRV logo" 
                    className={styles.logo} 
                    height={50} 
                    width={50} 
                />
            </div>
            <div className={styles.headerMessageCt}></div>
            <div className={styles.navCt}>
                <nav className={styles.navbar}>
                    <Link
                        href="dashboard"
                        className={currentPage === "dashboard" ? styles.activeLink : ""}>
                        {headerText.controlPanel}
                    </Link>
                    <Link href="help" className={currentPage === "help" ? styles.activeLink : ""}>
                        {headerText.help}
                    </Link>
                    <Link
                        href="profile"
                        className={currentPage === "profile" ? styles.activeLink : ""}>
                        {username}
                    </Link>
                    {/* TODO: Dropdown menü */}
                </nav>
                <LanguageSelector />
            </div>
        </div>
    );
};

export default Header;
