import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export default function ScoreBoard({
    isPlayer,
    name,
    score,
}: {
    isPlayer: boolean;
    name: string | undefined;
    score: Map<
        string,
        {
            score: number;
            ready: boolean;
            correct: boolean | null;
        }
    >;
}) {
    return (
        <div className={styles.scoreBoard}>
            {isPlayer ? (
                <div className={styles.playerScore}>
                    <div className={styles.playerName}>{name}:</div>
                    <div className={styles.score}>
                        {score.get(name!)?.score}
                    </div>
                    {score.get(name!)?.correct === null ? (
                        ""
                    ) : (
                        <div className={styles.correct}>
                            {score.get(name!)?.correct ? (
                                <FontAwesomeIcon icon={faCheck} />
                            ) : (
                                <FontAwesomeIcon icon={faX} />
                            )}
                        </div>
                    )}
                </div>
            ) : (
                Array.from(score.entries()).map(([player, data]) => (
                    <div key={player} className={styles.playerScore}>
                        <div className={styles.playerName}>{player}:</div>
                        <div className={styles.score}>{data.score}</div>
                        {data.correct === null ? (
                            ""
                        ) : (
                            <div className={styles.correct}>
                                {data.correct ? (
                                    <FontAwesomeIcon icon={faCheck} />
                                ) : (
                                    <FontAwesomeIcon icon={faX} />
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
