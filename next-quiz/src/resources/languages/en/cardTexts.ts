import { cardData } from "@/utils/types/text/cardTextData.type";
import { cardType } from "@/utils/types/cardType.type";

export const cardTexts: Record<cardType, cardData> = {
    chat: {
        title: "Chatroom",
        description: "Be connected with your friends!",
        buttonText: "Chat",
        buttonLink: "chat",
    },
    forum: {
        title: "Forum",
        description: "To discuss important things",
        buttonText: "Enter",
        buttonLink: "forum",
    },
    lobby: {
        title: "Game Lobby",
        description: "Have fun!",
        buttonText: "Let's go!",
        buttonLink: "lobby",
    },
};
