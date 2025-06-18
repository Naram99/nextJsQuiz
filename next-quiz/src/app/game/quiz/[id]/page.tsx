"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { socket, connectSocketWithFreshToken } from "@/socket/socket";
import AdminPage from "./AdminPage";
import MainDisplay from "./MainDisplay";
import ScoreBoard from "./ScoreBoard";
import { QuestionData } from "@/utils/types/games/QuestionData.type";

export default function QuizGamePage() {
    const router = useRouter();
    const { user: me } = useUser();

    const params = useParams();
    const id = params.id as string;

    const [playerType, setPlayerType] = useState<
        "admin" | "player" | "display"
    >("player");
    const [questionData, setQuestionData] = useState<QuestionData>({
        question: "",
        answer: {text: "", type: "handRaise", confirm: false}
    });
    const [score, setScore] = useState<
        Map<
            string,
            {
                score: number;
                ready: boolean;
                correct: boolean | null;
            }
        >
    >(new Map());

    useEffect(() => {
        if (!socket.connected) connectSocketWithFreshToken();

        socket.emit("validateJoinCode", id);
        socket.emit("quiz:requestData", id);

        socket.on("joinLobbyOk", handleJoinLobby);
        socket.on("quiz:playerData", handlePlayerData);
        socket.on("quiz:questionData", handleQuestionData);
        socket.on("matchEnd", handleEnd);

        function handleJoinLobby(bool: boolean) {
            if (!bool) router.push(`/${me?.name}/dashboard`);
        }

        function handlePlayerData(
            data: [
                string,
                { score: number; ready: boolean; correct: boolean | null }
            ][],
            owner: string
        ) {
            console.log(data);
            const newScore = new Map(data);
            setScore(newScore);
            setPlayerType(
                me?.name === owner
                    ? "admin"
                    : me?.name === "display"
                    ? "display"
                    : "player"
            );
        }

        function handleQuestionData(data: QuestionData) {
            setQuestionData(data);
        }

        function handleEnd() {
            router.back();
        }

        return () => {
            socket.off("joinLobbyOk", handleJoinLobby);
            socket.off("quiz:playerData", handlePlayerData);
            socket.off("quiz:playerData", handleQuestionData);
            socket.off("matchEnd", handleEnd);
        };
    }, [id, router, me]);

    return (
        <div className={styles.pageWrapper}>
            <ScoreBoard
                name={me?.name}
                score={score}
                isPlayer={playerType === "player"}
            />
            {playerType === "admin" ? (
                <AdminPage questionData={questionData} />
            ) : (
                <MainDisplay
                    isPlayer={playerType !== "display"}
                    questionData={questionData}
                />
            )}
        </div>
    );
}
