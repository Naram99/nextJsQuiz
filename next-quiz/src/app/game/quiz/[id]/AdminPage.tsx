import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";
import QuestionSelector from "./QuestionSelector";
import { CategoryData } from "@/utils/types/games/CategoryData.type";
import { socket } from "@/socket/socket";

export default function AdminPage({
    questionData,
    gameState,
    categoryData,
    handRaiseOrder,
}: {
    questionData: QuestionData;
    gameState: "start" | "select" | "question" | "showdown";
    categoryData: CategoryData[];
    handRaiseOrder: string[];
}) {
    function handleStart() {
        socket.emit("quiz:admin:start");
    }

    function handleAdminNext() {
        socket.emit("quiz:admin:nextQuestion");
    }

    function handleAdminEvaluate() {
        socket.emit("quiz:admin:evaluate");
    }

    function handleHandRaiseCorrect(correct: boolean) {
        socket.emit("quiz:admin:handRaiseCorrect", correct);
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
            {(gameState === "question" || gameState === "showdown") && (
                <>
                    <div className={styles.adminQuestion}>
                        {questionData.question}
                    </div>
                    <div className={styles.adminAnswer}>
                        {Array.isArray(questionData.answer.text)
                            ? questionData.answer.text.join(", ")
                            : questionData.answer.text}
                    </div>
                    {questionData.answer.type === "handRaise" &&
                        handRaiseOrder.length > 0 && (
                            <div className={styles.handRaiseCt}>
                                <div className={styles.handRaiseOrder}>
                                    {handRaiseOrder.length > 0
                                        ? handRaiseOrder.map((name) => (
                                              <div
                                                  className={
                                                      styles.handRaiseName
                                                  }
                                                  key={name}
                                              >
                                                  {name}
                                              </div>
                                          ))
                                        : "Waiting for hand raise..."}
                                </div>
                                <div className={styles.handRaiseAdminBtnCt}>
                                    <button
                                        type={"button"}
                                        className={styles.handRaiseAccept}
                                        onClick={() =>
                                            handleHandRaiseCorrect(true)
                                        }
                                    >
                                        Correct
                                    </button>
                                    <button
                                        type={"button"}
                                        className={styles.handRaiseDeny}
                                        onClick={() =>
                                            handleHandRaiseCorrect(false)
                                        }
                                    >
                                        Wrong
                                    </button>
                                </div>
                            </div>
                        )}
                    <div className={styles.adminNextBtnCt}>
                        <button
                            type={"button"}
                            onClick={handleAdminNext}
                            className={styles.adminNextBtn}
                        >
                            Next Question
                        </button>
                        <button
                            type={"button"}
                            onClick={handleAdminEvaluate}
                            className={styles.adminEvaluateBtn}
                        >
                            Evaluate Question
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
