import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { SkinsTable } from "../drizzle/schema";
import { SkinGameElement } from "../utils/type/SkinGameElement.type";

export default class SkinRandomizer {
    private filters = [
        {type: "blur", min: 33, max: 33, final: 0, value: "px", zoom: false},
        {type: "brightness", min: 0, max: 300, final: 100, value: "%", zoom: true},
        {type: "contrast", min: 20, max: 200, final: 100, value: "%", zoom: true},
        {type: "grayscale", min: 100, max: 100, final: 0, value: "%", zoom: true},
        {type: "hue-rotate", min: 60, max: 180, final: 0, value: "deg", zoom: true},
        {type: "invert", min: 60, max: 100, final: 0, value: "%", zoom: true},
        {type: "saturate", min: 500, max: 5000, final: 0, value: "%", zoom: true},
    ]
    public skins: SkinGameElement[] = []

    constructor(public readonly count: number) {}

    public async start() {
        await this.selectFromDb();
        this.randomizeFilters();
    }

    private async selectFromDb() {
        this.skins = await db.select({
            champ: SkinsTable.champion,
            name: SkinsTable.name,
            src: SkinsTable.src, 
            filter: sql`''`
        }).from(SkinsTable).orderBy(sql`RANDOM()`).limit(this.count)
    }

    private randomizeFilters() {
        for (let i = 0; i < this.skins.length; i++) {
            const random = Math.floor(Math.random() * Object.keys(this.filters).length);
            const randomFilter = this.filters[random];

            this.skins[i].filter = {
                type: randomFilter.type,
                start: Math.round(
                    Math.random() * (
                        randomFilter.max - randomFilter.min
                    ) + randomFilter.min),
                final: randomFilter.final,
                value: randomFilter.value,
                zoom: randomFilter.zoom
            }
        }
    }

    public get skinArray(): SkinGameElement[] {
        return this.skins;
    }
    
}