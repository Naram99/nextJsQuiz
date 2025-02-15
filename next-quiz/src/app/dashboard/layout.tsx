import Footer from "./Footer";
import Header from "./Header";
import styles from "./page.module.css";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <header className={styles.mainHeader}>
                <Header />
            </header>
            <main>{children}</main>
            <footer className={styles.mainFooter}>
                <Footer />
            </footer>
        </>
    );
};

export default MainLayout;
