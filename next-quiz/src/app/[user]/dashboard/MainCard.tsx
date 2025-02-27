import { cardData } from "@/utils/cardData.type";
import styles from "./page.module.css";

const MainCard: React.FC<cardData> = ({
    title,
    description,
    notification,
    buttonText,
    buttonLink,
}) => {
    return (
        <>
            <div className={styles.cardHeader}>{title}</div>
            <div className={styles.cardBody}>
                <div className={styles.cardText}>{description}</div>
                {notification && <div className={styles.cardNotify}>{notification}</div>}
            </div>
            <div className={styles.cardFooter}>
                <a className={styles.cardBtn} href={buttonLink}>
                    {buttonText}
                </a>
            </div>
        </>
    );
};

export default MainCard;
