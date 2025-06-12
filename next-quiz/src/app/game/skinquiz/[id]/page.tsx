"use client";

import { useUser } from "@/context/UserContext";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import SkinSelector from "./SkinSelector";
import { CurrentSkin } from "@/utils/types/games/CurrentSkin.type";
import SkinView from "./SkinView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export default function SkinQuizGamePage() {
    const router = useRouter();
    const { user: me } = useUser();

    const params = useParams();
    const id = params.id as string;
    

    const [level, setLevel] = useState<number>(0);
    const [score, setScore] = useState<
        Map<string, { score: number; ready: boolean; correct: boolean }>
    >(new Map());

    const [currentSkin, setCurrentSkin] = useState<CurrentSkin | null>(null);

    useEffect(() => {
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
            console.log(level, skin);
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
            console.log(data);
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
    }, []);

    return (
        <div className={styles.pageWrapper}>
             <div className={styles.header}>
                <div className={styles.scoreBoard}>
                    {Array.from(score.entries()).map(([player, data]) => (
                        <div key={player} className={styles.playerScore}>
                            <div className={styles.playerName}>
                                {player}:
                            </div>
                            <div className={styles.score}>{data.score}</div>
                            {data.correct === null ? "" : (
                                <div className={styles.correct}>
                                    {data.correct ? 
                                        (<FontAwesomeIcon icon={faCheck} />)
                                        :  (<FontAwesomeIcon icon={faX} />)
                                    }
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* <div className={styles.announcer}>
                    {announcer}
                </div> */}
            </div>
            {currentSkin === null ? "" : <SkinView skin={currentSkin} level={level} />}
            
            <SkinSelector />
        </div>
    );
}
