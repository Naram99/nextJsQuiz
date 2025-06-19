import { AnswerData } from "@/utils/types/games/AnswerData.type";
import styles from "../page.module.css";

export default function MultiSelect({
    data, 
    setAnswer
}: {
    data: AnswerData, 
    setAnswer: (answer: string[]) => void
}) {
    return <div className={styles.multiSelectCt}></div>
}