import { CurrentSkin } from "@/utils/types/games/CurrentSkin.type";
import styles from "./page.module.css";
import Image from "next/image";

export default function SkinView({
    skin,
    level,
}: {
    skin: CurrentSkin | null;
    level: number;
}) {
    console.log(skin?.filter);
    return (
        <div className={styles.skinWrapper}>
            {skin?.name}, {level}
            <Image src={skin!.src} alt={"skin"} height={100} width={100}/>
        </div>
    );
}
