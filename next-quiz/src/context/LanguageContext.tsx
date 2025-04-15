"use client";
import { cardData } from "@/utils/types/cardData.type";
import { cardType } from "@/utils/types/cardType.type";
import { headerData } from "@/utils/types/headerData.type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginData } from "@/utils/types/loginData.type";
import { chatData } from "@/utils/types/chatData.type";
import {forumTextData} from "@/utils/types/forumTextData.type";

interface LanguageTexts {
    cardTexts?: Record<cardType, cardData>;
    headerTexts?: headerData;
    loginTexts?: loginData;
    chatTexts?: chatData;
    forumTexts?: forumTextData;

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
                    forumModule
                ] = await Promise.all([
                    import(`@/resources/languages/${language}/cardTexts.ts`),
                    import(`@/resources/languages/${language}/headerTexts.ts`),
                    import(`@/resources/languages/${language}/loginTexts.ts`),
                    import(`@/resources/languages/${language}/chatTexts.ts`),
                    import(`@/resources/languages/${language}/forumTexts.ts`),

                    // Import new language texts here
                ]);

                setTexts({
                    cardTexts: cardModule.cardTexts,
                    headerTexts: headerModule.headerTexts,
                    loginTexts: loginModule.loginTexts,
                    chatTexts: chatModule.chatTexts,
                    forumTexts: forumModule.forumTexts

                    // Set new language texts here
                });
            } catch (error) {
                console.error(`Failed to load language files: ${error}`);
            }
        };

        loadTexts().then(r => console.log(r));
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
