import ServerContext from "../../utils/ServerContext";
import { SkinGameElement } from "../../utils/type/SkinGameElement.type";
import { UserInLobby } from "../../utils/type/UserInLobby.type";

export default class SkinQuizRound {
    private currentLevel: number = 0;
    private maxPoints: number = 50;

    constructor(
        private context: ServerContext,
        public readonly id: string,
        public readonly players: Map<string, UserInLobby>,
        public readonly updateScore: (
            data: { player: string; score: number }[]
        ) => void,
        private maxLevel: number,
        private currentSkin: SkinGameElement
    ) {
        this.socketListenersSetup();
        console.log(currentSkin);
        this.nextLevel(true, true);
    }

    private socketListenersSetup(): void {        
        this.players.forEach((player, id) => {
            player.socket?.removeAllListeners("skinQuiz:answer");

            player.socket?.on("skinQuiz:answer", (answer: string) => {
                if (answer === this.currentSkin.name) {
                    player.score += this.maxPoints - this.currentLevel * 10;
                    player.correct = true;
                } else {
                    player.correct = false;
                }
                if (
                    !Array.from(this.players).some(
                        ([key, user]) => user.correct === null
                    )
                ) {
                    if (this.currentLevel < this.maxLevel) this.nextLevel();
                }
            });
        });
    }

    private nextLevel(fullReset: boolean = false, start: boolean = false) {
        if (!start) this.currentLevel++;
        this.resetCorrect(fullReset);
        this.emitSkinData();
        this.emitPlayerData();
    }

    private emitPlayerData() {
        console.log("playerData emit");
        
        const data: Map<
            string,
            { score: number; ready: boolean; correct: boolean }
        > = new Map();
        this.players.forEach((player, id) => {
            data.set(id, {
                score: player.score,
                ready: player.isReady,
                correct: player.correct!,
            });
        });

        this.context.emitMap(this.id, "skinQuiz:playerData", data);
    }

    private emitSkinData() {
        console.log("skin emit", this.id);
        this.context.io
            .to(this.id)
            .emit("skinQuiz:nextLevel", this.currentLevel, this.currentSkin);
    }

    private resetCorrect(full: boolean) {
        if (full) {
            this.players.forEach((player, id) => {
                this.players.set(id, {
                    ...this.players.get(id)!,
                    correct: null,
                });
            });
        } else {
            this.players.forEach((player, id) => {
                if (!player.correct)
                    this.players.set(id, {
                        ...this.players.get(id)!,
                        correct: null,
                    });
            });
        }
    }
}
