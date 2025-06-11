import { CurrentSkin } from "@/utils/types/games/CurrentSkin.type";
import styles from "./page.module.css";

export default function SkinView({
    skin,
    level,
}: {
    skin: CurrentSkin | null;
    level: number;
}) {
    return (
        <div className={styles.skinWrapper}>
            {skin!.name}, {level}
        </div>
    );
}
