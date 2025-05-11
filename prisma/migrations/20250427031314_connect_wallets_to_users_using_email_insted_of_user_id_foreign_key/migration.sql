/*
  Warnings:

  - You are about to drop the column `userId` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `email` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_userId_fkey";

-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
