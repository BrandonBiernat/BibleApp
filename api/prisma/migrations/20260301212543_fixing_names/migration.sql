/*
  Warnings:

  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Translation";

-- CreateTable
CREATE TABLE "translations" (
    "id" UUID NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);
