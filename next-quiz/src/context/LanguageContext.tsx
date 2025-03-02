"use client";
import { cardData } from "@/utils/cardData.type";
import { cardType } from "@/utils/cardType.type";
import { headerData } from "@/utils/headerData.type";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {loginData} from "@/utils/loginData.type";

interface LanguageTexts {
    cardTexts?: Record<cardType, cardData>;
    headerTexts?: headerData;
    loginTexts?: loginData;

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
    });

    useEffect(() => {
        const loadTexts = async () => {
            try {
                const [cardModule, headerModule, loginModule] = await Promise.all([
                    import(`@/resources/languages/${language}/cardTexts.ts`),
                    import(`@/resources/languages/${language}/headerTexts.ts`),
                    import(`@/resources/languages/${language}/loginTexts.ts`),

                    // Import new language texts here
                ]);

                setTexts({
                    cardTexts: cardModule.cardTexts,
                    headerTexts: headerModule.headerTexts,
                    loginTexts: loginModule.loginTexts,

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
