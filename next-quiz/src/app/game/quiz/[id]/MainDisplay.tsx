import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";
import Answer from "./answerComponents/Answer";
import AnswerDisplay from "./answerComponents/AnswerDisplay";
import { CategoryData } from "@/utils/types/games/CategoryData.type";
import QuestionSelector from "./QuestionSelector";

export default function MainDisplay({
    isPlayer,
    questionData,
    hasAnswered,
    gameState,
    categories,
    selector,
}: {
    isPlayer: boolean;
    questionData: QuestionData;
    hasAnswered: boolean;
    gameState: "start" | "select" | "question" | "showdown";
    categories: CategoryData[];
    selector: string;
}) {
    return (
        <div className={styles.mainDisplay}>
            {gameState === "question" && (
                <>
                    <div className={styles.question}>
                        <h2>{questionData.question}</h2>
                    </div>
                    <div className={styles.answers}>
                        {!isPlayer ? (
                            <AnswerDisplay />
                        ) : !hasAnswered ? (
                            <Answer data={questionData.answer} />
                        ) : (
                            "Wait for next round"
                        )}
                    </div>
                </>
            )}
            {gameState === "select" && (
                <QuestionSelector categories={categories} />
            )}
        </div>
    );
}
