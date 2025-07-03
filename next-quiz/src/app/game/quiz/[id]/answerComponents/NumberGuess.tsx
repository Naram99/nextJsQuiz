import styles from "../page.module.css";

export default function NumberGuess({
    setAnswer,
}: {
    setAnswer: (answer: number) => void;
}) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAnswer(parseInt(e.target.value));
    }
    return (
        <div className={styles.answerCt}>
            <input
                type="number"
                name="answerNumber"
                onChange={handleChange}
                className={styles.answerInput}
                placeholder={"Tippelj egy számot"}
            />
        </div>
    );
}
