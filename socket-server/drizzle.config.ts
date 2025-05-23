import {defineConfig} from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    out: "./src/drizzle/migrations",
    schema: "./src/drizzle/schema.ts",
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