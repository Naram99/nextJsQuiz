"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { socket } from "@/socket/socket";

export default function RoundCounter({id}: {id: string}) {
    const [rounds, setRounds] = useState(1);

    function increase() {
        socket.emit("roundCount", id, rounds + 1);
        setRounds(rounds + 1);
    }

    function decrease() {
        socket.emit("roundCount", id, rounds - 1);
        setRounds(rounds - 1);
    }

    return (
        <div className={styles.roundCounter}>
            <div className={styles.roundTitle}>{/* TODO: texts */}</div>
            <div className={styles.counter}>
                <div className={styles.minus} onClick={decrease}>
                    <FontAwesomeIcon icon={faMinus} />
                </div>
                <div className={styles.count}>{rounds}</div>
                <div className={styles.plus} onClick={increase}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
        </div>
    )
}