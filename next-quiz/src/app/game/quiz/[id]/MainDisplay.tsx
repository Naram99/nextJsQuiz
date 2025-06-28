import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";
import Answer from "./answerComponents/Answer";
import AnswerDisplay from "./answerComponents/AnswerDisplay";

export default function MainDisplay({
    isPlayer,
    questionData,
    hasAnswered,
    gameState,
}: {
    isPlayer: boolean;
    questionData: QuestionData;
    hasAnswered: boolean;
    gameState: "select" | "question" | "showdown";
}) {
    return (
        <div className={styles.mainDisplay}>
            <div className={styles.question}>
                <h2>{questionData.question}</h2>
            </div>

            <div className={styles.answers}>
                {!isPlayer ? (
                    <AnswerDisplay />
                ) : !hasAnswered ? (
                    <Answer data={questionData.answer} />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
