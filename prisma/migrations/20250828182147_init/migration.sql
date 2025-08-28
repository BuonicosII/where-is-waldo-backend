-- CreateTable
CREATE TABLE "public"."Game" (
    "id" TEXT NOT NULL,
    "player" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "subjectOneId" TEXT NOT NULL,
    "subjectTwoId" TEXT NOT NULL,
    "subjectThreeId" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Subject" (
    "id" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_subjectOneId_fkey" FOREIGN KEY ("subjectOneId") REFERENCES "public"."Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_subjectTwoId_fkey" FOREIGN KEY ("subjectTwoId") REFERENCES "public"."Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_subjectThreeId_fkey" FOREIGN KEY ("subjectThreeId") REFERENCES "public"."Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
