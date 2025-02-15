import styles from "./page.module.css";

const Header = () => {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.logoCt}></div>
            <div className={styles.headerMessageCt}></div>
            <div className={styles.navCt}></div>
        </div>
    );
};

export default Header;
