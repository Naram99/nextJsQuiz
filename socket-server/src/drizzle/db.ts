import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"
import dotenv from "dotenv";

dotenv.config();


export const db = drizzle({
    schema,
    connection: {
        password: String(process.env.DB_PASSWORD),
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME
    }
})

