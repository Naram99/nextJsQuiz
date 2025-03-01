import Loading from "@/components/loading";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./page.module.css";

const MainLayout = async ({
    children,
    params,
}: Readonly<{ children: React.ReactNode; params?: Promise<{ user?: string }> }>) => {
    const param = await params;
    const user = param?.user
    if (!param || !user) {
        return <Loading />;
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
