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
    const currentFilterValue = skin!.filter.start - (skin!.filter.start - skin!.filter.final) * level;
    const styleFilter = {
        filter: `${skin?.filter.type}(${currentFilterValue}${skin?.filter.value})` 
    }
    return (
        <div className={styles.skinWrapper}>
            <Image 
                src={skin!.src} 
                alt={"skin"} 
                height={100} 
                width={100} 
                quality={100}
                unoptimized={true}
                className={styles.skin} 
                style={styleFilter}
            />
        </div>
    );
}
