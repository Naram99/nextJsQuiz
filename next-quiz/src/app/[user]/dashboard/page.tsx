import styles from "./page.module.css";
import MainCard from "./MainCard";
import { cardTexts } from "@/resources/languages/hu/cardTexts";

const Dashboard = () => {
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.cardsCt}>
                {Object.entries(cardTexts).map(([key, card]) => (
                    <div className={styles.card} key={key}>
                        <MainCard {...card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
