import { cardData } from "@/utils/types/cardData.type";
import styles from "./page.module.css";
import Link from "next/link";

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
                <Link className={styles.cardBtn} href={buttonLink}>
                    {buttonText}
                </Link>
            </div>
        </>
    );
};

export default MainCard;
