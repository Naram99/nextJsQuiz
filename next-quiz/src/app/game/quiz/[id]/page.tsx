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
import { CategoryData } from "@/utils/types/games/CategoryData.type";

type GameState = "select" | "question" | "showdown";

export default function QuizGamePage() {
    const router = useRouter();
    const { user: me } = useUser();

    const params = useParams();
    const id = params.id as string;

    const [gameState, setGameState] = useState<GameState>("select");
    const [playerType, setPlayerType] = useState<
        "admin" | "player" | "display"
    >("player");
    const [questionData, setQuestionData] = useState<QuestionData>({
        id: "",
        question: "",
        used: false,
        answer: { text: "", type: "handRaise", confirm: false, points: 0 },
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
        socket.on("quiz:nextQuestionSelect", handleNextSelect);
        socket.on("quiz:questionData", handleQuestionData);
        socket.on("quiz:allAnswers", handleAllAnswers);
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

        function handleNextSelect(selector: string, categories: CategoryData) {
            setGameState("select");
        }

        function handleQuestionData(data: QuestionData) {
            setGameState("question");
            setQuestionData(data);
        }

        function handleAllAnswers() {}

        function handleEnd() {
            router.back();
        }

        return () => {
            socket.off("joinLobbyOk", handleJoinLobby);
            socket.off("quiz:playerData", handlePlayerData);
            socket.off("quiz:nextQuestionSelect", handleNextSelect);
            socket.off("quiz:questionData", handleQuestionData);
            socket.off("quiz:allAnswers", handleAllAnswers);
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
                    hasAnswered={score.get(me!.name)?.correct !== null}
                    gameState={gameState}
                />
            )}
        </div>
    );
}
