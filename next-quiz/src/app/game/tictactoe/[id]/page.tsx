"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { TicTacToePlayer } from "@/utils/types/games/TicTacToePlayer.type";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import React from "react";

export default function TicTacToeGamePage() {
    const me = useUser();
    // TODO: texts

    const params = useParams();
    const id = params.id as string;

    const [ready, setReady] = useState(false);
    const [score, setScore] = useState<Map<string, number>>(new Map());
    const [board, setBoard] = useState<(TicTacToePlayer | null)[]>(Array(9).fill(null));

    useEffect(() => {
        if (!socket.connected) connectSocketWithFreshToken();

        socket.on("newGame", setNewGame);
        socket.on("scoreUpdate", updateScore);
        socket.on("tictactoeMove", updateBoard);

        function setNewGame() {
            setBoard(Array(9).fill(null));
            setReady(false);
        }

        function updateScore(score: Map<string, number>) {
            setScore(score);
        }

        function updateBoard(board: (TicTacToePlayer | null)[]) {
            setBoard(board);
        }

        return () => {
            socket.off("newGame", setNewGame);
            socket.off("scoreUpdate", updateScore);
            socket.off("tictactoeMove", updateBoard);
        };
    }, []);

    function handleReady() {
        setReady(true);
    }

    function handleMove(index: number) {
        socket.emit("tictactoeMoveSend", index, me?.name);
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <div className={styles.scoreBoard}>{/* TODO: scoreboard */}</div>
                <div className={styles.announcer}>{/* TODO: announcer */}</div>
            </div>
            <div className={styles.board}>
                {board.map((cell, index) => (
                    <div key={index} className={styles.boardCell} onClick={() => handleMove(index)}>
                        {cell}
                    </div>
                ))}
            </div>
            <div className={styles.footer}>
                {ready && (
                    <button type={"button"} onClick={handleReady}>
                        {/* TODO: texts */}
                    </button>
                )}
            </div>
        </div>
    );
}
