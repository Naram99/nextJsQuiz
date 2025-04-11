import { cardData } from "@/utils/types/cardData.type";
import { cardType } from "@/utils/types/cardType.type";

export const cardTexts: Record<cardType, cardData> = {
    chat: {
        title: "Csevegőfelület",
        description: "Hogy mindig elérd a barátaidat!",
        buttonText: "Csevegés",
        buttonLink: "chat",
        notification: "1 olvasatlan!",
    },
    forum: {
        title: "Fórum",
        description: "A lényeges dolgok kivesézésére",
        buttonText: "Belépés",
        buttonLink: "forum",
    },
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
};
