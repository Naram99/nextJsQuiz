"use client";

import { useState } from "react";
import styles from "../page.module.css";

export default function DateGuess({
    setAnswer,
}: {
    setAnswer: (answer: number) => void;
}) {
    const years = [
        2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
    ];

    const months = [
        "Január",
        "Február",
        "Március",
        "Április",
        "Május",
        "Június",
        "Július",
        "Augusztus",
        "Szeptember",
        "Október",
        "November",
        "December",
    ];

    const [year, setYear] = useState<string>("2000");
    const [monthIndex, setMonthIndex] = useState<number>(0);

    function handleYearChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setYear(e.target.value);
        callSetAnswer(e.target.value, monthIndex);
    }

    function handleMonthChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setMonthIndex(Number(e.target.value));
        callSetAnswer(year, Number(e.target.value));
    }

    function callSetAnswer(year: string, monthIndex: number) {
        console.log(year, monthIndex);
        const date = new Date(`${year}-${monthIndex + 1}`);
        console.log(date);

        setAnswer(date.getTime());
    }

    return (
        <div className={styles.answerCt}>
            <select
                className={styles.dateSelector}
                onChange={handleYearChange}
                value={year}
            >
                {years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <select
                className={styles.dateSelector}
                onChange={handleMonthChange}
                value={monthIndex}
            >
                {months.map((month, index) => (
                    <option key={index} value={index}>
                        {month}
                    </option>
                ))}
            </select>
        </div>
    );
}
