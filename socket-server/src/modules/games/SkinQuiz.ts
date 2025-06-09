import SkinRandomizer from "../SkinRandomizer";
import {UserInLobby} from "../../utils/type/UserInLobby.type";

export default class SkinQuiz {
    private randomizer: SkinRandomizer;

    constructor(
        public readonly id: string,
        public readonly rounds: number,
        public readonly players: Map<string, UserInLobby>,
        public readonly updateScore: (player: string, score: number) => void
    ) {
        this.randomizer = new SkinRandomizer(rounds);
    }

    public async start(): Promise<void> {
        await this.randomizer.start();
        this.socketListenersSetup();   
    }

    private socketListenersSetup(): void {
        this.players.forEach((player, id) => {
            player.socket?.removeAllListeners("skinQuiz:answer");

            player.socket?.on("skinQuiz:answer", (answer: string) => {})
        });
    }

    private nextRound() {}
}
