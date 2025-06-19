import { MultiSelectAnswerData } from "@/utils/types/games/AnswerData.type";
import styles from "../page.module.css";
import { useEffect, useState } from "react";

export default function MultiSelect({
    data,
    setAnswer,
}: {
    data: MultiSelectAnswerData;
    setAnswer: (answer: string[]) => void;
}) {
    const [options, setOptions] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        async function getOptions() {
            const resp = await fetch("/api/games/quiz", {
                method: "GET",
                credentials: "include",
            });

            const respData = await resp.json();
            setOptions(respData.data);
        }

        if (data.selectType === "champion") getOptions();
        if (data.selectType === "event") {
            setOptions(
                [
                    "ARAM",
                    "URF",
                    "MSI",
                    "Worlds",
                    "Bandle City",
                    "Noxus",
                    "Demacia",
                    "Ionia",
                    "Freljord",
                    "Shurima",
                    "Piltover",
                    "Zaun",
                    "Shadow Isles",
                ].sort()
            );
        }
        if (data.selectType === "car") {
            setOptions(
                [
                    "Ford",
                    "Fiat",
                    "Skoda",
                    "Renault",
                    "Volkswagen",
                    "Mercedes",
                    "Iveco",
                    "Opel",
                    "Peugeot",
                    "Kia",
                    "Hyundai",
                    "Citroen",
                ].sort()
            );
        }
    }, []);

    // Initialize selected array when options or data.amount changes
    useEffect(() => {
        setSelected(Array(data.amount).fill(""));
    }, [options, data.amount]);

    function handleChange(
        index: number,
        e: React.ChangeEvent<HTMLSelectElement>
    ) {
        const newSelected = [...selected];
        newSelected[index] = e.target.value;
        setSelected(newSelected);
        setAnswer(newSelected);
    }

    return (
        <div className={styles.multiSelectCt}>
            {Array.from({ length: data.amount }, (_, i) => (
                <div key={i} className={styles.select}>
                    <select
                        value={selected[i] || ""}
                        onChange={(e) => handleChange(i, e)}
                    >
                        <option value="" disabled>
                            Select...
                        </option>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}
