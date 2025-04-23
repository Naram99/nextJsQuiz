import axios from "axios";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import * as tar from "tar";

async function updateData(patch: string, dir: string): Promise<boolean> {
    console.log(typeof tar.x);
    try {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const response = await axios({
            method: "GET",
            url: `https://ddragon.leagueoflegends.com/cdn/dragontail-${patch}.tgz`,
            responseType: "stream",
        });

        await new Promise((resolve, reject) => {
            pipeline(response.data, tar.x({ C: dir }), (error) =>
                error ? reject(error) : resolve(true)
            );
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

updateData(process.argv[2], "/lol");
