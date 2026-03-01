import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

let db: PrismaClient;

function getDb(): PrismaClient {
    if (!db) {
        const connectionString = process.env.DATABASE_URL!;
        if (!connectionString) throw new Error('DATABASE_URL is not set');
        const adapter = new PrismaPg({ connectionString });
        db = new PrismaClient({ adapter });
    }
    return db;
}

export { getDb };