"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { socket } from "@/socket/socket";

type QuizSelectData = {
    id: string;
    title: string;
};

export default function QuizSelector({ id }: { id?: string }) {
    const [options, setOptions] = useState<QuizSelectData[]>([]);
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        async function getOptions() {
            const resp = await fetch("/api/games/quiz", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ id: id }),
            });

            const respData = await resp.json();
            console.log(respData.data);

            setOptions(respData.data);
        }

        getOptions();
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelected(e.target.value);
        socket.emit("quizChange", e.target.value);
    }

    return (
        <select
            className={styles.quizSelect}
            onChange={handleChange}
            value={selected}
        >
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.title}
                </option>
            ))}
        </select>
    );
}
