import styles from './page.module.css'

export default function Message({msg, sender}: {msg: string, sender: string}) {
    // TODO: class based on who sent it
    return (
        <div className={styles.messageRow}>
            <div className={styles.messageCard}>
                <div className={styles.sender}>{sender}</div>
                <div className={styles.msgContent}>{msg}</div>
            </div>
        </div>
    )
}