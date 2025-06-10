"use client";

import { useUser } from "@/context/UserContext";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connectSocketWithFreshToken, socket } from "@/socket/socket";
import { SkinData } from "@/utils/types/games/SkinData.type";

type CurrentSkin = {
    name: string;
    champion: string;
    src: string;
    filter: {
        type: string;
        start: number;
        final: number;
        value: string;
        zoom: boolean;
    }
}

export default function SkinQuizGamePage() {
    const router = useRouter();
    const { user: me, isLoading } = useUser();

    const params = useParams();
    const id = params.id as string;

    const [rounds, setRounds] = useState<number>(0);
    const [score, setScore] = useState<Map<string, {score: number, ready: boolean, correct: boolean}>>(new Map());
    const [skins, setSkins] = useState<SkinData[]>([]);
    const [currentSkin, setCurrentSkin] = useState<CurrentSkin | null>(null);

    useEffect(() => {
        if (isLoading) return;
        if (!socket.connected) connectSocketWithFreshToken();

        socket.emit("validateJoinCode", id);
        socket.emit("skinquiz:requestData", id);

        socket.on("joinLobbyOk", handleJoinLobby);
        socket.on("skinquiz:newRound", handleNewRound);
        socket.on("skinquiz:playerData", handlePlayerData);
        socket.on("scoreUpdate", handleScore);

        function handleJoinLobby(bool: boolean) {
            if (!bool) router.push(`/${me?.name}/dashboard`);
        }

        function handleNewRound(round: number, skin: CurrentSkin) {
            setRounds(round);
            setCurrentSkin(skin);
        }

        function handlePlayerData(data: [string, {score: number, ready: boolean, correct: boolean}][]) {
            const newScore = new Map(data);
            setScore(newScore);
        }

        function handleScore(scoreData: [string, number][]) {
            setScore((prevScore) => {
                const updated = new Map(prevScore);
                scoreData.forEach(([name, newScore]) => {
                    const current = updated.get(name);
                    if (current) {
                        updated.set(name, { ...current, score: newScore, correct: true });
                    }
                });
                return updated;
            });
        }
    }, [isLoading]);

    useEffect(() => {
        const fetchSkins = async () => {
            const resp = await fetch(`/api/games/skinquiz`);
            const data = await resp.json();
            setSkins(data.data);
        }

        fetchSkins();
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <h1>
                SkinQuizPage, {id}, {me?.name}
            </h1>
        </div>
    );
}
