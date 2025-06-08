"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";

export default function RoundCounter({ id, name }: { id: string; name: string | undefined }) {
    const [rounds, setRounds] = useState(1);

    useEffect(() => {
        if (!socket.connected) connectSocketWithFreshToken();

        function handleRoundChange(round: number) {
            setRounds(round);
        }

        socket.on("roundChange", handleRoundChange);

        return () => {
            socket.off("roundChange", handleRoundChange);
        };
    }, []);

    function increase() {
        socket.emit("setRound", id, name, rounds + 1);
        setRounds(rounds + 1);
    }

    function decrease() {
        socket.emit("setRound", id, name, rounds - 1);
        setRounds(rounds - 1);
    }

    return (
        <div className={styles.roundCounter}>
            <div className={styles.roundTitle}>{/* TODO: texts */}Rounds</div>
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
    );
}
