import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

export default function LobbyUser({name, owner}: {name: string, owner: boolean}) {
    return (
        <div className={styles.lobbyUser}>
            {owner && (<FontAwesomeIcon icon={faCrown} />)}
            {name}
        </div>
    )
}