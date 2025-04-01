import styles from "./page.module.css";
import Image from "next/image";

const NotFound = () => {
    return (
        <div className={styles.errorWrapper}>
            <div className={styles.errorCt}>
                <div className={styles.codeCt}>
                    <div className={styles.number}>4</div>
                    <div className={styles.errorLogoCt}>
                        <Image
                            src={"/logoWhite.png"}
                            alt="DRV logo"
                            className={styles.errorLogo}
                            width={50}
                            height={50}
                        />
                    </div>
                    <div className={styles.number}>4</div>
                </div>
                <div className={styles.messageCt}>
                    Looks like you want to access a page which does not exists.
                </div>
            </div>
        </div>
    );
};

export default NotFound;
