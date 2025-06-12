"use client";

import { socket } from "@/socket/socket";
import { SkinData } from "@/utils/types/games/SkinData.type";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function SkinSelector() {
    const [champions, setChampions] = useState<string[]>([]);
    const [selectedChampion, setSelectedChampion] = useState<string>("Aatrox");
    const [skins, setSkins] = useState<SkinData[]>([]);
    const [selectedSkin, setSelectedSkin] = useState("");

    // Data is not coming from socket
    useEffect(() => {
        const fetchSkins = async () => {
            const resp = await fetch(`/api/games/skinquiz`);
            const data = await resp.json();
            setSkins(data.data);
            setChampions([...new Set(data.data.map(skin => skin.champion))])
        };

        fetchSkins();
    }, []);

    function handleChampionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedChampion(e.target.value)
    }

    function handleSkinChange(name: string) {
        setSelectedSkin(name);
    }

    function handleSubmit() {
        socket.emit("skinQuiz:answer", selectedSkin);
    }

    return (
        <div className={styles.selectorWrapper}>
            SkinSelector
            <select name="champion" id={"champion"} onChange={handleChampionChange}>
                {champions.map(champ => (<option key={champ}>{champ}</option>))}
            </select>
            <select name="skin" id={"skin"}>
                {skins.filter(skin => skin.champion === selectedChampion).map(skin => (
                    <option key={skin.name}>{skin.name}</option>
                ))}
            </select>
        </div>
    );
}
