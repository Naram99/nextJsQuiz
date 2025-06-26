"use client";

import { AnswerData } from "@/utils/types/games/AnswerData.type";
import styles from "../page.module.css";
import { socket } from "@/socket/socket";
import { useState } from "react";
import NumberGuess from "./NumberGuess";
import DateGuess from "./DateGuess";
import SingleAnswer from "./SingleAnswer";
import MultiSelect from "./MultiSelect";

export default function Answer({ data }: { data: AnswerData }) {
    const [answer, setAnswer] = useState<string | string[] | number>("");

    function handleAnswerSend() {
        // TODO: Confirm
        console.log(answer);
        socket.emit("quiz:answer", answer);
    }

    function handleHandRaise() {
        socket.emit("quiz:handRaise");
    }

    function handleAnswer(answer: string | string[] | number) {
        setAnswer(answer);
    }

    return (
        <div className={styles.answerWrapper}>
            {data.type === "single" ? (
                <SingleAnswer setAnswer={handleAnswer} />
            ) : (
                ""
            )}
            {data.type === "guessNumber" ? (
                <NumberGuess setAnswer={handleAnswer} />
            ) : (
                ""
            )}
            {data.type === "guessDate" ? (
                <DateGuess setAnswer={handleAnswer} />
            ) : (
                ""
            )}
            {data.type === "multiSelect" ? (
                <MultiSelect data={data} setAnswer={handleAnswer} />
            ) : (
                ""
            )}
            {data.type === "handRaise" ? (
                <button
                    type={"button"}
                    onClick={handleHandRaise}
                    className={styles.answerBtn}
                >
                    Answer
                </button>
            ) : (
                <button
                    type={"button"}
                    onClick={handleAnswerSend}
                    className={styles.answerBtn}
                >
                    Send
                </button>
            )}
        </div>
    );
}
