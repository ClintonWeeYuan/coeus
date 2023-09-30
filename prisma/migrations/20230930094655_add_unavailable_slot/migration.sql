-- CreateTable
CREATE TABLE "UnavailableSlot" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnavailableSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnavailableSlot_ownerId_key" ON "UnavailableSlot"("ownerId");

-- AddForeignKey
ALTER TABLE "UnavailableSlot" ADD CONSTRAINT "UnavailableSlot_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
