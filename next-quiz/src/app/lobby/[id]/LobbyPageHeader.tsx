import { LobbySettings } from "@/utils/interfaces/LobbySettings.interface";
import styles from "./page.module.css";
import { lobbyType } from "@/utils/types/lobbyType.type";
import { gameCardType } from "@/utils/types/gameCardType.type";

export default function LobbyPageHeader({
    owner,
    code,
    settings,
    setLobbyType,
    setGameType
}: {
    owner: boolean,
    code: string,
    settings: LobbySettings,
    setLobbyType: (e: React.MouseEvent) => void,
    setGameType: (e: React.MouseEvent) => void
}) {
    
    // TODO: Owner can select lobbytype and gametype
    const lobbyTypes: lobbyType[] = ["computer", "friend", "open"];
    const gameTypes: gameCardType[] = ["quiz", "tictactoe"];

    return (
        <div className={styles.lobbyPageHeader}>
            <div className={styles.lobbyTypeDisplay}>
                <div className={styles.lobbyTypeSelector}>
                    {owner ? lobbyTypes.map(lobbyType => (
                        <div 
                            key={lobbyType} 
                            className={settings.lobbyType === lobbyType 
                                ? styles.lobbyTypeOptionActive 
                                : styles.lobbyTypeOption}
                            onClick={setLobbyType}
                        >{lobbyType}</div>
                    )) : <div className={styles.lobbyTypeOptionActive}>{settings.lobbyType}</div>}
                </div>
            </div>
            <div className={styles.lobbyCode}>{code}</div>
            <div className={styles.gameTypeDisplay}>
                <div className={styles.gameTypeSelector}>
                    {owner ? gameTypes.map(gameType => (
                        <div 
                            key={gameType} 
                            className={settings.game === gameType 
                                ? styles.gameTypeOptionActive 
                                : styles.gameTypeOption}
                            onClick={setGameType}
                        >{gameType}</div>
                    )) : <div className={styles.gameTypeOptionActive}>{settings.game}</div>}
                </div>
            </div>
        </div>
    );
}
