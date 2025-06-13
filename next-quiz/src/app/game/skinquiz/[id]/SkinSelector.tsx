"use client";

import { socket } from "@/socket/socket";
import { SkinData } from "@/utils/types/games/SkinData.type";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function SkinSelector({
    correct,
}: {
    correct: boolean | null | undefined;
}) {
    const [champions, setChampions] = useState<string[]>([]);
    const [selectedChampion, setSelectedChampion] = useState<string>("Aatrox");
    const [skins, setSkins] = useState<SkinData[]>([]);
    const [selectedSkin, setSelectedSkin] = useState("");

    // Data is not coming from socket
    useEffect(() => {
        const fetchSkins = async () => {
            const resp = await fetch(`/api/games/skinquiz`);
            const data = (await resp.json()) as { data: SkinData[] };
            setSkins(data.data);
            setChampions([
                ...new Set(data.data.map((skin: SkinData) => skin.champion)),
            ]);
        };

        fetchSkins();
    }, []);

    function handleChampionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedChampion(e.target.value);
        setSelectedSkin("default");
    }

    function handleSkinChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedSkin(e.target.value);
    }

    function handleSubmit() {
        if (selectedSkin) socket.emit("skinQuiz:answer", selectedSkin, selectedChampion);
    }

    return (
        <div className={styles.selectorWrapper}>
            <div className={styles.selector}>
                <div className={styles.selectorTitle}>Champion: </div>
                <select
                    name="champion"
                    id={"champion"}
                    onChange={handleChampionChange}
                >
                    {champions.map((champ) => (
                        <option key={champ}>{champ}</option>
                    ))}
                </select>
            </div>
            <div className={styles.selector}>
                <div className={styles.selectorTitle}>Skin: </div>
                <select name="skin" id={"skin"} onChange={handleSkinChange}>
                    {skins
                        .filter((skin) => skin.champion === selectedChampion)
                        .map((skin) => (
                            <option key={skin.name}>{skin.name}</option>
                        ))}
                </select>
            </div>
            {!correct && (
                <button
                    type={"button"}
                    onClick={handleSubmit}
                    className={styles.sendBtn}
                >
                    Send
                </button>
            )}
        </div>
    );
}
