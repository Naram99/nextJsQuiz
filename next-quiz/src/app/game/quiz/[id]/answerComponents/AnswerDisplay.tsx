import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "../page.module.css";
import Image from "next/image";

export default function AnswerDisplay({
    questionData,
    handRaiseOrder,
    gameState,
    allAnswers,
}: {
    questionData: QuestionData;
    handRaiseOrder: string[];
    gameState: "start" | "select" | "question" | "showdown";
    allAnswers: { [index: string]: number | string | string[] };
}) {
    console.log("AnswerDisplay", allAnswers);

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
            {gameState === "showdown" && (
                <>
                    <div className={styles.answer}>
                        {Array.isArray(questionData.answer.text)
                            ? questionData.answer.text.join(", ")
                            : questionData.answer.text}
                    </div>
                    {questionData.answer.pictureSrc &&
                        Array.isArray(questionData.answer.pictureSrc) &&
                        questionData.answer.pictureSrc.map((pic) => (
                            <div className={styles.answerPicture} key={pic}>
                                <Image
                                    src={pic}
                                    width={100}
                                    height={100}
                                    alt="answer picture"
                                />
                            </div>
                        ))}
                    <div className={styles.allAnswers}>
                        {Object.entries(allAnswers).map(([name, answer]) => (
                            <div className={styles.playerAnswer} key={name}>
                                {name}:{" "}
                                {Array.isArray(answer)
                                    ? answer.join(", ")
                                    : answer}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
