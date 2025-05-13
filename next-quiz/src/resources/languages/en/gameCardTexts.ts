import { gameCardType } from "@/utils/types/gameCardType.type";
import { cardData } from "@/utils/types/text/cardTextData.type";

export const gameCardTexts: Record<gameCardType, cardData> = {
    tictactoe: {
        title: "Tic-Tac-Toe",
        description: "The classic game",
        buttonText: "Start",
        buttonLink: "tictactoe",
    },
    quiz: {
        title: "Quiz",
        description: "Who knows better?",
        buttonText: "Start",
        buttonLink: "quiz",
    },
}