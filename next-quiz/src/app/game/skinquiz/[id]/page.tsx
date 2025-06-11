"use client";

import { useUser } from "@/context/UserContext";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import SkinSelector from "./SkinSelector";
import { CurrentSkin } from "@/utils/types/games/CurrentSkin.type";
import SkinView from "./SkinView";

export default function SkinQuizGamePage() {
    const router = useRouter();
    const { user: me, isLoading } = useUser();

    const params = useParams();
    const id = params.id as string;

    const [level, setLevel] = useState<number>(0);
    const [score, setScore] = useState<
        Map<string, { score: number; ready: boolean; correct: boolean }>
    >(new Map());

    const [currentSkin, setCurrentSkin] = useState<CurrentSkin | null>(null);

    useEffect(() => {
        if (isLoading) return;
        if (!socket.connected) connectSocketWithFreshToken();

        socket.emit("validateJoinCode", id);
        socket.emit("skinQuiz:requestData", id);

        socket.on("joinLobbyOk", handleJoinLobby);
        //socket.on("skinQuiz:allSkins", handleAllSkins);
        socket.on("skinQuiz:newRound", handleNewRound);
        socket.on("skinQuiz:nextLevel", handleNextLevel);
        socket.on("skinQuiz:playerData", handlePlayerData);
        socket.on("scoreUpdate", handleScore);
        socket.on("matchEnd", handleEnd);

        function handleJoinLobby(bool: boolean) {
            if (!bool) router.push(`/${me?.name}/dashboard`);
        }

        function handleNewRound(skin: CurrentSkin) {
            setCurrentSkin(skin);
        }

        function handleNextLevel(level: number, skin: CurrentSkin) {
            setLevel(level);
            setCurrentSkin(skin);
        }

        /* // Data is not coming from socket
        function handleAllSkins(skins: SkinData[]) {
            setSkins(skins);
        }*/

        function handlePlayerData(
            data: [
                string,
                { score: number; ready: boolean; correct: boolean }
            ][]
        ) {
            const newScore = new Map(data);
            setScore(newScore);
        }

        function handleScore(scoreData: [string, number][]) {
            setScore((prevScore) => {
                const updated = new Map(prevScore);
                scoreData.forEach(([name, newScore]) => {
                    const current = updated.get(name);
                    if (current) {
                        updated.set(name, {
                            ...current,
                            score: newScore,
                            correct: true,
                        });
                    }
                });
                return updated;
            });
        }

        function handleEnd() {
            router.back();
        }

        return () => {
            socket.off("joinLobbyOk", handleJoinLobby);
            //socket.off("skinquiz:allSkins", handleAllSkins);
            socket.off("skinQuiz:newRound", handleNewRound);
            socket.off("skinQuiz:nextLevel", handleNextLevel);
            socket.off("skinQuiz:playerData", handlePlayerData);
            socket.off("scoreUpdate", handleScore);
            socket.off("matchEnd", handleEnd);
        };
    }, [isLoading]);

    return (
        <div className={styles.pageWrapper}>
            <h1>
                SkinQuizPage, {id}, {me?.name}
            </h1>
            <SkinView skin={currentSkin} level={level} />
            <SkinSelector />
        </div>
    );
}
