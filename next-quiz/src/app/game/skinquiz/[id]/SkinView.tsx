import {
    CurrentSkin,
    CurrentSkinZoom,
} from "@/utils/types/games/CurrentSkin.type";
import styles from "./page.module.css";
import Image from "next/image";

export default function SkinView({
    skin,
    level,
    maxLevel,
}: {
    skin: CurrentSkin | null;
    level: number;
    maxLevel: number;
}) {
    const currentFilterValue =
        skin!.filter.start -
        ((skin!.filter.start - skin!.filter.final) / maxLevel) * level;
    const currentScaleValue = setCurrentZoom();
    const styleFilter = {
        filter: `${skin?.filter.type}(${currentFilterValue}${skin?.filter.value})`,
        transform: `scale(${currentScaleValue})`,
        transformOrigin: setTransformOrigin(),
    };

    function setCurrentZoom() {
        if (skin?.filter.zoom && typeof skin.filter.zoom !== "boolean") {
            const zoom = skin.filter.zoom as CurrentSkinZoom;

            return (
                zoom.scaleStart -
                ((zoom.scaleStart - zoom.scaleEnd) / maxLevel) * level
            );
        }
        return 1;
    }

    function setTransformOrigin(): string {
        if (skin?.filter.zoom && typeof skin.filter.zoom !== "boolean") {
            const zoom = skin.filter.zoom as CurrentSkinZoom;

            return `${zoom.top ? "top" : "bottom"} ${
                zoom.left ? "left" : "right"
            }`;
        }
        return "center center";
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
