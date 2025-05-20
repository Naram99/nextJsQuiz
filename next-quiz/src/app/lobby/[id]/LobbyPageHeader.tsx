import { LobbySettings } from "@/utils/interfaces/LobbySettings.interface";
import styles from "./page.module.css";

export default function LobbyPageHeader({
    me,
    code,
    settings,
}: {
    me: string | undefined;
    code: string;
    settings: LobbySettings;
}) {
    // TODO: Owner can select lobbytype and gametype
    return (
        <div className={styles.lobbyPageHeader}>
            <div className={styles.lobbyType}>{settings.lobbyType}</div>
            <div className={styles.lobbyCode}>{code}</div>
            <div className={styles.gameType}>{settings.game}</div>
        </div>
    );
}
