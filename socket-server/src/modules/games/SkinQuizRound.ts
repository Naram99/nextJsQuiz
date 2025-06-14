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
        this.resetCorrect(true);
        this.nextLevel(true, true);
    }

    private socketListenersSetup(): void {
        this.players.forEach((player, id) => {
            player.socket?.removeAllListeners("skinQuiz:requestData");
            player.socket?.removeAllListeners("skinQuiz:answer");

            player.socket?.on("skinQuiz:requestData", (code: string) => {
                this.emitPlayerData();
                this.emitSkinData();
            });

            player.socket?.on(
                "skinQuiz:answer",
                (answer: string, champion: string) => {
                    if (
                        answer === this.currentSkin.name &&
                        champion === this.currentSkin.champ
                    ) {
                        console.log(`${player.name} guessed correctly!`);
                        this.players.set(id, {
                            ...this.players.get(id)!,
                            score:
                                this.players.get(id)!.score +
                                (this.maxPoints - this.currentLevel * 10),
                            correct: true,
                        });
                    } else {
                        console.log("Answer was incorrect");
                        this.players.set(id, {
                            ...this.players.get(id)!,
                            correct: false,
                        });
                    }

                    if (
                        !Array.from(this.players).some(
                            ([key, user]) => user.correct === null
                        )
                    ) {
                        if (
                            this.currentLevel < this.maxLevel &&
                            Array.from(this.players).some(
                                ([key, user]) => user.correct === false
                            )
                        )
                            this.nextLevel();
                        else {
                            const data: { player: string; score: number }[] =
                                [];
                            this.players.forEach((user, key) => {
                                data.push({ player: key, score: 0 });
                            });
                            this.updateScore(data);
                        }
                    } else this.emitPlayerData();
                }
            );
        });
    }

    private nextLevel(fullReset: boolean = false, start: boolean = false) {
        if (!start) this.currentLevel++;
        this.resetCorrect(fullReset);
        this.emitSkinData();
        this.emitPlayerData();
    }

    private emitPlayerData() {
        const data: Map<
            string,
            {
                score: number;
                ready: boolean;
                correct: boolean | null | undefined;
            }
        > = new Map();
        this.players.forEach((player, id) => {
            data.set(player.name, {
                score: player.score,
                ready: player.isReady,
                correct: player.correct,
            });
        });

        this.context.emitMap(this.id, "skinQuiz:playerData", data);
    }

    private emitSkinData() {
        this.context.io
            .to(this.id)
            .emit(
                "skinQuiz:nextLevel",
                { currentLevel: this.currentLevel, maxLevel: this.maxLevel },
                this.currentSkin
            );
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
