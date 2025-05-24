import { QuizSettings } from "../type/settings/QuizSettings.type";

export default interface QuizGame {
    id: string;
    settings: QuizSettings;
}
