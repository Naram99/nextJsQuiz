import { QuestionData } from "@/utils/types/games/QuestionData.type";
import styles from "./page.module.css";

export default function MainDisplay({
    isPlayer,
    questionData,
}: {
    isPlayer: boolean;
    questionData: QuestionData;
}) {
    return <div>Main display {isPlayer ? "player" : "display"}</div>;
}
