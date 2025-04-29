import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../../../next-quiz/src/drizzle/schema";

// TODO: DB connection review

export const db = drizzle({
    schema,
    connection: {
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME
    }
})

