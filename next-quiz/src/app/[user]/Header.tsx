"use client";
import Image from "next/image";
import styles from "./page.module.css";
import logo from "../../../public/logoWhite.png";
import { notFound, usePathname } from "next/navigation";
import Link from "next/link";

const Header = ({ username }: { username: string | undefined }) => {
    if (!username) {
        notFound();
    }

    const pathname: string = usePathname();
    const currentPage = pathname.split("/").pop();

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.logoCt}>
                <Image src={logo} alt="DRV logo" className={styles.logo} />
            </div>
            <div className={styles.headerMessageCt}></div>
            <div className={styles.navCt}>
                <nav className={styles.navbar}>
                    <Link
                        href="dashboard"
                        className={currentPage === "dashboard" ? styles.activeLink : ""}>
                        Irányítópult
                    </Link>
                    <Link href="help" className={currentPage === "help" ? styles.activeLink : ""}>
                        Súgó
                    </Link>
                    <Link
                        href="profile"
                        className={currentPage === "profile" ? styles.activeLink : ""}>
                        {username}
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;
