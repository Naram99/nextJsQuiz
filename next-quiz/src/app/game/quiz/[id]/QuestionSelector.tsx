import styles from "./page.module.css";
import { socket } from "@/socket/socket";
import { CategoryData } from "@/utils/types/games/CategoryData.type";
import Image from "next/image";

export default function QuestionSelector({
    categories,
}: {
    categories: CategoryData[];
}) {
    function handleSelect(id: string) {
        socket.emit("quiz:selectQuestion", id);
    }

    return (
        <div className={styles.questionSelectorCt}>
            {categories.map((category) => (
                <div className={styles.categoryRow} key={category.id}>
                    <div className={styles.categoryName}>{category.name}</div>
                    <div className={styles.categoryQuestions}>
                        {category.questions.map((question) => (
                            <div key={question.id} className={styles.question}>
                                <Image
                                    alt="category icon"
                                    height={100}
                                    width={100}
                                    className={
                                        question.used
                                            ? styles.usedQuestionIcon
                                            : styles.questionIcon
                                    }
                                    src={category.iconsPath + question.id}
                                    onClick={() => handleSelect(question.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
