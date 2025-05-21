import styles from "./page.module.css";

export default function LobbyPageFooter(
    {min, max, curr}: 
    {min: number, max: number, curr: number}) {
        return (
            <div className={styles.lobbyFooterWrapper}>
                {curr < min ? (<>
                    <div className={styles.currentPlayersError}>{curr}</div>
                    <div className={styles.requiredPlayers}>/{min}</div>
                </>) : curr > max ? (<>
                    <div className={styles.currentPlayersError}>{curr}</div>
                    <div className={styles.requiredPlayers}>/{max}</div>
                </>) : (<>
                    <div className={styles.currentPlayers}>{curr}</div>
                    <div className={styles.requiredPlayers}>/{max}</div>
                </>)}
            </div>
        )
}