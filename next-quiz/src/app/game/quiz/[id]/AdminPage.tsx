import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";
import QuestionSelector from "./QuestionSelector";
import { CategoryData } from "@/utils/types/games/CategoryData.type";
import { socket } from "@/socket/socket";

export default function AdminPage({
    questionData,
    gameState,
    categoryData,
}: {
    questionData: QuestionData;
    gameState: "start" | "select" | "question" | "showdown";
    categoryData: CategoryData[];
}) {
    function handleStart() {
        socket.emit("quiz:admin:start");
    }

    return (
        <div className={styles.adminPageWrapper}>
            <h1>Admin page</h1>
            {gameState === "start" && (
                <button
                    type={"button"}
                    onClick={handleStart}
                    className={styles.adminStart}
                >
                    Start
                </button>
            )}
            {gameState === "select" && (
                <QuestionSelector categories={categoryData} />
            )}
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
