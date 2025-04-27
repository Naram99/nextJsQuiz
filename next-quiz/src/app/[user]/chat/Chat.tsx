import styles from "./page.module.css";

export default function Chat({selected}: {selected: string}) {
    return (
        <div className={styles.chatWrapper}>
            {selected}
        </div>
    )
}