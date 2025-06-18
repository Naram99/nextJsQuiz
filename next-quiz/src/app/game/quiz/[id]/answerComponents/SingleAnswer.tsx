import styles from "../page.module.css"

export default function SingleAnswer({setAnswer}: {setAnswer: (answer: string) => void}) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAnswer(e.target.value)
    }
    return <div className={styles.answerCt}>
        <input 
            type="text" 
            name="answerText" 
            onChange={handleChange} 
            className={styles.answerInput} 
        />
    </div>
}