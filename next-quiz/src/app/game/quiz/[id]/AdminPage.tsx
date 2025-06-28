import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";
import QuestionSelector from "./QuestionSelector";

export default function AdminPage({
    questionData,
    gameState,
}: {
    questionData: QuestionData;
    gameState: "select" | "question" | "showdown";
}) {
    return (
        <div className={styles.adminPageWrapper}>
            {gameState === "select" && <QuestionSelector />}
            {gameState === "question" && (
                <>
                    <div className={styles.adminQuestion}>
                        {questionData.question}
                    </div>
                    <div className={styles.adminAnswer}>
                        {Array.isArray(questionData.answer.text)
                            ? questionData.answer.text.join(", ")
                            : questionData.answer.text}
                    </div>
                </>
            )}
        </div>
    );
}
