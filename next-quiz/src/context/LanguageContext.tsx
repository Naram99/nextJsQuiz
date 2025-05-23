"use client";
import { cardData } from "@/utils/types/text/cardTextData.type";
import { cardType } from "@/utils/types/cardType.type";
import { headerData } from "@/utils/types/text/headerTextData.type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginData } from "@/utils/types/text/loginTextData.type";
import { chatData } from "@/utils/types/text/chatTextData.type";
import { forumTextData } from "@/utils/types/text/forumTextData.type";
import { profileTextData } from "@/utils/types/text/profileTextData.type";
import { gameCardType } from "@/utils/types/gameCardType.type";
import { lobbyTextData } from "@/utils/types/text/lobbyTextData.type";

interface LanguageTexts {
    cardTexts?: Record<cardType, cardData>;
    headerTexts?: headerData;
    loginTexts?: loginData;
    chatTexts?: chatData;
    forumTexts?: forumTextData;
    profileTexts?: profileTextData;
    gameCardTexts?: Record<gameCardType, cardData>;
    lobbyTexts?: lobbyTextData;

    // Add new language texts here
}

interface LanguageContextType {
    language: string;
    texts: LanguageTexts;
    setLanguage: (language: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState("hu");
    const [texts, setTexts] = useState<LanguageTexts>({
        cardTexts: {} as Record<cardType, cardData>,
        headerTexts: {} as headerData,
        loginTexts: {} as loginData,
        chatTexts: {} as chatData,
        forumTexts: {} as forumTextData,
        profileTexts: {} as profileTextData,
        gameCardTexts: {} as Record<gameCardType, cardData>,
        lobbyTexts: {} as lobbyTextData,

        // Set new language texts here
    });

    useEffect(() => {
        const loadTexts = async () => {
            try {
                const [
                    cardModule,
                    headerModule,
                    loginModule,
                    chatModule,
                    forumModule,
                    profileModule,
                    gameCardModule,
                    lobbyModule
                ] = await Promise.all([
                    import(`@/resources/languages/${language}/cardTexts.ts`),
                    import(`@/resources/languages/${language}/headerTexts.ts`),
                    import(`@/resources/languages/${language}/loginTexts.ts`),
                    import(`@/resources/languages/${language}/chatTexts.ts`),
                    import(`@/resources/languages/${language}/forumTexts.ts`),
                    import(`@/resources/languages/${language}/profileTexts.ts`),
                    import(`@/resources/languages/${language}/gameCardTexts.ts`),
                    import(`@/resources/languages/${language}/lobbyTexts.ts`),

                    // Import new language texts here
                ]);

                setTexts({
                    cardTexts: cardModule.cardTexts,
                    headerTexts: headerModule.headerTexts,
                    loginTexts: loginModule.loginTexts,
                    chatTexts: chatModule.chatTexts,
                    forumTexts: forumModule.forumTexts,
                    profileTexts: profileModule.profileTexts,
                    gameCardTexts: gameCardModule.gameCardTexts,
                    lobbyTexts: lobbyModule.lobbyTexts,

                    // Set new language texts here
                });
            } catch (error) {
                console.error(`Failed to load language files: ${error}`);
            }
        };

        loadTexts().then();
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, texts, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider!");
    return context;
};
