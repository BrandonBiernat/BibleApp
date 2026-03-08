-- CreateTable
CREATE TABLE "books" (
    "id" UUID NOT NULL,
    "translationId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);
