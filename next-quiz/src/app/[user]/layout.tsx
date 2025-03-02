import Loading from "@/components/loading";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./page.module.css";
import React from "react";

const MainLayout = async ({
    children,
    params,
}: Readonly<{ children: React.ReactNode; params?: Promise<{ user?: string }> }>) => {
    const param = await params;
    let user = param?.user;
    if (!param || !user) {
        return <Loading />;
    } else if (user) {
        user = decodeURI(user);
    }

    return (
        <>
            <header className={styles.mainHeader}>
                <Header username={user} />
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.mainFooter}>
                <Footer />
            </footer>
        </>
    );
};

export default MainLayout;
