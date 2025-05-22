import { useContext } from "react";
import styles from "./page.module.css";
import { LanguageContext } from "@/context/LanguageContext";

export default function LobbyPageFooter({
    min,
    max,
    curr,
    leave,
    start
}: {
    min: number;
    max: number;
    curr: number;
    leave: () => void;
    start: () => void;
}) {
    const { texts } = useContext(LanguageContext)!;
    const lobbyText = texts.lobbyTexts!;

    return (
        <div className={styles.lobbyFooterWrapper}>
            <div className={styles.startBtn} onClick={start}>
                {lobbyText.startMatch}
            </div>
            <div className={styles.userNumber}>
                {curr < min ? (
                    <>
                        <div className={styles.currentPlayersError}>{curr}</div>
                        <div className={styles.requiredPlayers}>/{min}</div>
                    </>
                ) : curr > max ? (
                    <>
                        <div className={styles.currentPlayersError}>{curr}</div>
                        <div className={styles.requiredPlayers}>/{max}</div>
                    </>
                ) : (
                    <>
                        <div className={styles.currentPlayers}>{curr}</div>
                        <div className={styles.requiredPlayers}>/{max}</div>
                    </>
                )}
            </div>
            <div className={styles.leaveBtn} onClick={leave}>
                {lobbyText.leave}
            </div>
        </div>
    );
}
