import { gameCardType } from "@/utils/types/gameCardType.type";
import { cardData } from "@/utils/types/text/cardTextData.type";

export const gameCardTexts: Record<gameCardType, cardData> = {
    tictactoe: {
        title: "Amőba",
        description: "Örök klasszikus",
        buttonText: "Indítás",
        buttonLink: "tictactoe",
    },
    quiz: {
        title: "Kvíz",
        description: "Ki tud többet?",
        buttonText: "Start",
        buttonLink: "quiz",
    },
}