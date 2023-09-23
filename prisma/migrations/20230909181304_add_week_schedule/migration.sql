-- CreateTable
CREATE TABLE "WeekSchedule" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "schedule" JSONB NOT NULL,
    "timezone" TEXT NOT NULL,

    CONSTRAINT "WeekSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeekSchedule_ownerId_key" ON "WeekSchedule"("ownerId");

-- AddForeignKey
ALTER TABLE "WeekSchedule" ADD CONSTRAINT "WeekSchedule_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
