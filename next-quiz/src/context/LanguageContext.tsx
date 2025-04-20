"use client";
import { cardData } from "@/utils/types/text/cardTextData.type";
import { cardType } from "@/utils/types/cardType.type";
import { headerData } from "@/utils/types/text/headerTextData.type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginData } from "@/utils/types/text/loginTextData.type";
import { chatData } from "@/utils/types/text/chatTextData.type";
import {forumTextData} from "@/utils/types/text/forumTextData.type";
import {profileTextData} from "@/utils/types/text/profileTextData.type";

interface LanguageTexts {
    cardTexts?: Record<cardType, cardData>;
    headerTexts?: headerData;
    loginTexts?: loginData;
    chatTexts?: chatData;
    forumTexts?: forumTextData;
    profileTexts?: profileTextData;

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
                ] = await Promise.all([
                    import(`@/resources/languages/${language}/cardTexts.ts`),
                    import(`@/resources/languages/${language}/headerTexts.ts`),
                    import(`@/resources/languages/${language}/loginTexts.ts`),
                    import(`@/resources/languages/${language}/chatTexts.ts`),
                    import(`@/resources/languages/${language}/forumTexts.ts`),
                    import(`@/resources/languages/${language}/profileTexts.ts`),

                    // Import new language texts here
                ]);

                setTexts({
                    cardTexts: cardModule.cardTexts,
                    headerTexts: headerModule.headerTexts,
                    loginTexts: loginModule.loginTexts,
                    chatTexts: chatModule.chatTexts,
                    forumTexts: forumModule.forumTexts,
                    profileTexts: profileModule.profileTexts,

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
