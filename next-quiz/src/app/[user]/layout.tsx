import Loading from "@/components/loading";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./page.module.css";

const MainLayout = ({
    children,
    params,
}: Readonly<{ children: React.ReactNode; params?: { user?: string } }>) => {
    if (!params || !params.user) {
        return <Loading />;
    }

    return (
        <>
            <header className={styles.mainHeader}>
                <Header username={params.user} />
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.mainFooter}>
                <Footer />
            </footer>
        </>
    );
};

export default MainLayout;
