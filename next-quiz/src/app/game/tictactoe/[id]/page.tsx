"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { TicTacToePlayer } from "@/utils/types/games/TicTacToePlayer.type";
import { useUser } from "@/context/UserContext";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function TicTacToeGamePage() {
    const router = useRouter();
    const me = useUser();
    // TODO: texts

    const params = useParams();
    const id = params.id as string;

    const [ready, setReady] = useState(false);
    // TODO: review Score data type
    const [score, setScore] = useState<Map<string, {symbol: TicTacToePlayer, score: number}>>(new Map());
    const [board, setBoard] = useState<(TicTacToePlayer | null)[]>(Array(9).fill(null));

    useEffect(() => {
        if (!socket.connected) connectSocketWithFreshToken();

        // TODO: Check if user in lobby, join or leave if not
        socket.emit("validateJoinCode", id);

        socket.on("joinLobbyOk", handleJoinLobby);
        socket.on("tictactoe:newGame", setNewGame);
        socket.on("tictactoe:playerData", setPlayerData);
        socket.on("scoreUpdate", updateScore);
        socket.on("tictactoe:move", updateBoard);
        //socket.on("tictactoe:gameEnd", handleEnd);

        function handleJoinLobby(bool: boolean) {
            if (!bool) router.push(`/${me?.name}/dashboard`);
        }

        function setNewGame() {
            setBoard(Array(9).fill(null));
            setReady(false);
        }

        function setPlayerData(data: Map<string, {symbol: TicTacToePlayer, score: number}>) {
            console.log(data);
            setScore(data);
        }

        function updateScore(scoreData: Map<string, number>) {
            console.log(scoreData);
            
            const updated = new Map(score);
            scoreData.forEach((num, name) => {
                updated.set(name, {...updated.get(name)!, score: num})
            })
            setScore(updated);
        }

        function updateBoard(board: (TicTacToePlayer | null)[]) {
            setBoard(board);
        }

        return () => {
            socket.off("joinLobbyOk", handleJoinLobby);
            socket.off("newGame", setNewGame);
            socket.off("tictactoe:playerData", setPlayerData);
            socket.off("scoreUpdate", updateScore);
            socket.off("tictactoe:move", updateBoard);
        };
    }, []);

    function handleReady() {
        setReady(true);
    }

    function handleMove(index: number) {
        socket.emit("tictactoe:moveSend", id, index, me?.name);
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <div className={styles.scoreBoard}>{
                    Array.from(score.entries()).map(([player, data]) => (
                        <div key={player} className={styles.playerScore}>
                            <div className={styles.playerName}>{player} ({data.symbol}):</div>
                            <div className={styles.score}>{data.score}</div>
                        </div>
                    ))
                }</div>
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
                    <button type={"button"} onClick={handleReady} className={styles.readyBtn}>
                        {/* TODO: texts */}
                    </button>
                )}
            </div>
        </div>
    );
}
