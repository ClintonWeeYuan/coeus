-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('PRIVATE', 'GROUP');

-- CreateTable
CREATE TABLE "ClassEvent" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "classType" "ClassType" NOT NULL DEFAULT 'PRIVATE',
    "studentName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "alert" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "ClassEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassEvent" ADD CONSTRAINT "ClassEvent_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
