import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";
import Answer from "./answerComponents/Answer";
import AnswerDisplay from "./answerComponents/AnswerDisplay";
import { CategoryData } from "@/utils/types/games/CategoryData.type";
import QuestionSelector from "./QuestionSelector";
import Image from "next/image";
import ShowdownDisplay from "./answerComponents/ShowdownDisplay";

export default function MainDisplay({
    isPlayer,
    questionData,
    hasAnswered,
    gameState,
    categories,
    me,
    selector,
    handRaiseOrder,
    allAnswers,
}: {
    isPlayer: boolean;
    questionData: QuestionData;
    hasAnswered: boolean;
    gameState: "start" | "select" | "question" | "showdown";
    categories: CategoryData[];
    me?: string;
    selector: string;
    handRaiseOrder: string[];
    allAnswers: { [index: string]: number | string | string[] };
}) {
    return (
        <div className={styles.mainDisplay}>
            {gameState === "question" && (
                <>
                    <div className={styles.question}>
                        <h2>{questionData.question}</h2>
                    </div>
                    {questionData.pictureSrc && (
                        <Image
                            src={questionData.pictureSrc}
                            height={100}
                            width={100}
                            alt="question picture"
                            unoptimized={true}
                            className={styles.mainDisplayImg}
                        />
                    )}
                    <div className={styles.answers}>
                        {!isPlayer ? (
                            <AnswerDisplay
                                questionData={questionData}
                                gameState={gameState}
                                handRaiseOrder={handRaiseOrder}
                            />
                        ) : !hasAnswered ? (
                            <Answer data={questionData.answer} />
                        ) : (
                            "Wait for next round"
                        )}
                    </div>
                </>
            )}
            <div className={styles.selectorCt}>
                {
                    //gameState === "select" && (me === selector || !isPlayer) ? (
                    gameState === "select" && !isPlayer ? (
                        <QuestionSelector categories={categories} />
                    ) : (
                        gameState === "select" &&
                        `${selector} is selecting the next question`
                    )
                }
            </div>
            {gameState === "showdown" && (
                <ShowdownDisplay
                    questionData={questionData}
                    allAnswers={allAnswers}
                />
            )}
        </div>
    );
}
