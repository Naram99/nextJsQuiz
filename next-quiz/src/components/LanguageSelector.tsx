import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = () => {
        if (language === "hu") setLanguage("en");
        else setLanguage("hu");
    };

    return (
        <div className={"languageCt"}>
            <Image
                src={language === "hu" ? "/hu.png" : "/en.png"}
                alt="Language selector"
                width={50}
                height={50}
                onClick={handleLanguageChange}
                className={"language"}
            />
        </div>
    );
};

export default LanguageSelector;
