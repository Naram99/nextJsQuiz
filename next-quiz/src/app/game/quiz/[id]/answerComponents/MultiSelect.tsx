import { AnswerData, MultiSelectAnswerData } from "@/utils/types/games/AnswerData.type";
import styles from "../page.module.css";
import { useEffect, useState } from "react";

export default function MultiSelect({
    data, 
    setAnswer
}: {
    data: MultiSelectAnswerData, 
    setAnswer: (answer: string[]) => void
}) {
    const [options, setOptions] = useState<string[]>([])
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
        async function getOptions() {
            const resp = await fetch("/api/games/quiz", {
                method: "GET",
                credentials: "include"
            })

            const respData = await resp.json();
            setOptions(respData.data);
        }

        if (data.selectType === "champion")
            getOptions()
        if (data.selectType === "event") {
            setOptions([
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
                "Shadow Isles"
            ].sort())
        }
        if (data.selectType === "car") {
            setOptions([
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
                "Citroen"
            ].sort())
        }
    }, [])

    // let myArray = Array.from({ length }, (_, i) => i);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        // TODO: setSelected()
        setAnswer(selected)
    }

    return <div className={styles.multiSelectCt}>
        {Array.from({length: data.amount}, (_, i) => i).map(index => (
            <div key={index} className={styles.select}>{/* TODO: Selects */}</div>
        ))}
    </div>
}