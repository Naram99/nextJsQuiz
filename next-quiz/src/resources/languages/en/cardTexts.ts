import { cardData } from "@/utils/types/cardData.type";
import { cardType } from "@/utils/types/cardType.type";

export const cardTexts: Record<cardType, cardData> = {
    chat: {
        title: "Chatroom",
        description: "Be connected to your friends!",
        buttonText: "Chat",
        buttonLink: "chat",
        notification: "1 new!",
    },
    forum: {
        title: "Forum",
        description: "To discuss important things",
        buttonText: "Enter",
        buttonLink: "forum",
    },
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
};
