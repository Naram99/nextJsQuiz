import axios from "axios";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import * as tar from "tar";

async function updateData(patch: string, dir: string): Promise<boolean> {
    console.log(`Updating to patch: ${patch}`);
    try {
        if (!fs.existsSync(`./${dir}/${patch}`)) fs.mkdirSync(`./${dir}/${patch}`, { recursive: true });

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

updateData(process.argv[2], "lol")
    .then(r => console.log(`Update finished with: ${r ? "success" : "error"}`))
    .catch(e => console.log(e));
