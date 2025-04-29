import {defineConfig} from "drizzle-kit";

export default defineConfig({
    out: "../next-quiz/src/drizzle/migrations",
    schema: "../next-quiz/src/drizzle/schema.ts",
    strict: true,
    verbose: true,
    dialect: "postgresql",
    dbCredentials: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "",
        host: process.env.DB_HOST || "127.0.0.1",
        port: Number(process.env.DB_PORT) || 5432,
        ssl: false,
    }
})