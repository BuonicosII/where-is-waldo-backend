-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_subjectOneId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_subjectThreeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_subjectTwoId_fkey";

-- AlterTable
ALTER TABLE "public"."Game" ALTER COLUMN "subjectOneId" DROP NOT NULL,
ALTER COLUMN "subjectTwoId" DROP NOT NULL,
ALTER COLUMN "subjectThreeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_subjectOneId_fkey" FOREIGN KEY ("subjectOneId") REFERENCES "public"."Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_subjectTwoId_fkey" FOREIGN KEY ("subjectTwoId") REFERENCES "public"."Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_subjectThreeId_fkey" FOREIGN KEY ("subjectThreeId") REFERENCES "public"."Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
