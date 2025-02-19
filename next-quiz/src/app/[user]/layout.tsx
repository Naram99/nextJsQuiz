import Footer from "./Footer";
import Header from "./Header";
import styles from "./page.module.css";

const MainLayout = ({
    children,
    params,
}: Readonly<{ children: React.ReactNode; params: { user: string } }>) => {
    return (
        <>
            <header className={styles.mainHeader}>
                <Header username={params.user} />
            </header>
            <main>{children}</main>
            <footer className={styles.mainFooter}>
                <Footer />
            </footer>
        </>
    );
};

export default MainLayout;
