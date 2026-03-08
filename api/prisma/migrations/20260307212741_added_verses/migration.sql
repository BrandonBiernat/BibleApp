-- CreateTable
CREATE TABLE "verses" (
    "id" UUID NOT NULL,
    "chapterId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "headingText" TEXT NOT NULL,

    CONSTRAINT "verses_pkey" PRIMARY KEY ("id")
);
