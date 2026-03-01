import "dotenv/config";
import path from 'path'
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: path.join('src', 'prisma', 'schema.prisma'),
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});