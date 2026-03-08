import Database from 'better-sqlite3';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const DB_PATH = process.argv.includes('--db')
    ? process.argv[process.argv.indexOf('--db') + 1]
    : path.resolve('../../../../bible.db');

const main = async () => {
    console.log(`Opening SQLite at ${DB_PATH}`);
    const sqlite = new Database(DB_PATH, { readonly: true });
    const prisma = new PrismaClient();

    
};