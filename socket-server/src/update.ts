import axios from "axios";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import * as tar from "tar";
import { db } from "./drizzle/db";
import { sql } from "drizzle-orm";
import { SkinsTable } from "./drizzle/schema";

async function updateData(patch: string, dir: string): Promise<boolean> {
    console.log(`Updating to patch: ${patch}`);
    // return true; // Debugging JSON read
    try {
        if (!fs.existsSync(`./${dir}/${patch}`))
            fs.mkdirSync(`./${dir}/${patch}`, { recursive: true });

        const response = await axios({
            method: "GET",
            url: `https://ddragon.leagueoflegends.com/cdn/dragontail-${patch}.tgz`,
            responseType: "stream",
        });

        await new Promise((resolve, reject) => {
            pipeline(response.data, tar.x({ C: `./${dir}/${patch}` }), (error) =>
                error ? reject(error) : resolve(true)
            );
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

interface Skin {
    name: string;
    num: number;
}

interface PartialChampionInfo {
    skins: Skin[];
    id: string;
}

async function insertSkinsToDb(patch: string) {
    console.log("Inserting strings to DB...");

    try {
        await db.transaction(async (tx) => {
            // Tábla kiürítése
            await tx.execute(sql`TRUNCATE TABLE skins RESTART IDENTITY`);

            // JSON betöltése
            const filePath = path.resolve(
                __dirname, 
                `../../next-quiz/public/lol/${patch}/${patch}/data/en_US/championFull.json`
            )
            console.log(__dirname);
            console.log(filePath);

            const fileData = fs.readFileSync((filePath), 'utf-8');

            const data = JSON.parse(fileData);

            const champions = data.data as Record<string, PartialChampionInfo>;

            const skinsToInsert = [];

            for (const [champion, info] of Object.entries(champions)) {
                for (const skin of info.skins) {
                    skinsToInsert.push({
                        champion,
                        number: skin.num,
                        name: skin.name,
                        src: `/lol/${patch}/img/champion/centered/${champion}_${skin.num}.jpg`,
                    });
                }
            }

            await tx.insert(SkinsTable).values(skinsToInsert);
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}

updateData(process.argv[2], "../next-quiz/public/lol").then((r) => {
    console.log(`Update finished with: ${r ? "success" : "error"}`);
    if (r) insertSkinsToDb(process.argv[2]);
});
