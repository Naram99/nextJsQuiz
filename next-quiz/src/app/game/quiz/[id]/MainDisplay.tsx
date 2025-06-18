import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";
import Answer from "./answerComponents/Answer";
import AnswerDisplay from "./answerComponents/AnswerDisplay";

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
            {isPlayer 
                ? <Answer data={questionData.answer} />
                : <AnswerDisplay />
            }
        </div>
    </div>;
}
