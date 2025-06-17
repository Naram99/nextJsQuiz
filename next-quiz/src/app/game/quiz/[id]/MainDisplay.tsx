import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";

export default function MainDisplay({
    isPlayer,
    questionData,
}: {
    isPlayer: boolean;
    questionData: QuestionData;
}) {
    return <div className={styles.mainDisplay}>
        <div className={styles.question}>
            <h2>{questionData.question}</h2>
        </div>
        <div className={styles.answers}>
            
        </div>
    </div>;
}
