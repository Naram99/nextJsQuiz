import { cardData } from "@/utils/types/text/cardTextData.type";
import { cardType } from "@/utils/types/cardType.type";

export const cardTexts: Record<cardType, cardData> = {
    chat: {
        title: "Csevegőfelület",
        description: "Hogy mindig elérd a barátaidat!",
        buttonText: "Csevegés",
        buttonLink: "chat",
    },
    forum: {
        title: "Fórum",
        description: "A lényeges dolgok kivesézésére",
        buttonText: "Belépés",
        buttonLink: "forum",
    },
    lobby: {
        title: "Játékszoba",
        description: "Ki a jobb?",
        buttonText: "Indítás",
        buttonLink: "/lobby",
    },
};
