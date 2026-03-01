-- CreateTable
CREATE TABLE "Translation" (
    "id" UUID NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);
