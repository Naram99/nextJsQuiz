import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "../page.module.css";

export default function AnswerDisplay({
    questionData,
    handRaiseOrder,
    gameState,
}: {
    questionData: QuestionData;
    handRaiseOrder: string[];
    gameState: "start" | "select" | "question" | "showdown";
}) {
    console.log("AnswerDisplay", gameState);

    return (
        <div className={styles.answerDisplay}>
            {questionData.answer.type === "handRaise" &&
                gameState === "question" && (
                    <div className={styles.handRaiseDisplayCt}>
                        <div className={styles.handRaiseOrder}>
                            {handRaiseOrder.length > 0 ? (
                                <div className={styles.handRaiseName}>
                                    {handRaiseOrder[0]} is answering
                                </div>
                            ) : (
                                "Waiting for hand raise..."
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
}
