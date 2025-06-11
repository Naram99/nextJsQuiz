"use client";

import { socket } from "@/socket/socket";
import { SkinData } from "@/utils/types/games/SkinData.type";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function SkinSelector() {
    const [skins, setSkins] = useState<SkinData[]>([]);
    const [selectedSkin, setSelectedSkin] = useState("");

    // Data is not coming from socket
    useEffect(() => {
        const fetchSkins = async () => {
            const resp = await fetch(`/api/games/skinquiz`);
            const data = await resp.json();
            setSkins(data.data);
        };

        fetchSkins();
    }, []);

    function handleSkinChange(name: string) {
        setSelectedSkin(name);
    }

    function handleSubmit() {
        socket.emit("skinQuiz:answer", selectedSkin);
    }

    return <div className={styles.selectorWrapper}>SkinSelector</div>;
}
