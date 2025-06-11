import { SkinGameElement } from "../../utils/type/SkinGameElement.type";
import { UserInLobby } from "../../utils/type/UserInLobby.type";

export default class SkinQuizRound {
    private currentLevel: number = 0;

    constructor(
        public readonly id: string,
        public readonly players: Map<string, UserInLobby>,
        public readonly updateScore: (player: string, score: number) => void,
        private maxLevel: number,
        private currentSkin: SkinGameElement,
    ) {
        this.socketListenersSetup();
        console.log(currentSkin)
    }

    private socketListenersSetup(): void {
        this.players.forEach((player, id) => {
            player.socket?.removeAllListeners("skinQuiz:answer");

            player.socket?.on("skinQuiz:answer", (answer: string) => {})
        });
    }
}