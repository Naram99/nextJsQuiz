import SkinRandomizer from "../SkinRandomizer";

export default class SkinQuiz {
    private randomizer: SkinRandomizer;

    constructor(public readonly id: string, public readonly rounds: number) {
        this.randomizer = new SkinRandomizer(rounds);
    }

    public async start(): Promise<void> {
        await this.randomizer.start();
        this.socketListenersSetup();   
    }

    private socketListenersSetup(): void {}

    private nextRound() {}
}
