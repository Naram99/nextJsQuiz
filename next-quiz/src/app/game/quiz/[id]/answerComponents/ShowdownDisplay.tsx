import styles from "../page.module.css";
import { QuestionData } from "@/utils/types/games/QuestionData.type";
import Image from "next/image";

export default function ShowdownDisplay({
    questionData,
    allAnswers,
}: {
    questionData: QuestionData;
    allAnswers: { [index: string]: number | string | string[] };
}) {
    console.log("Showdown display");

    return (
        <div className={styles.allAnswerDisplay}>
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
                        {name}:
                        {Array.isArray(answer) ? answer.join(", ") : answer}
                    </div>
                ))}
            </div>
        </div>
    );
}
