/*
  Warnings:

  - You are about to drop the column `holders` on the `active_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `tokenId` on the `wallet_tokens` table. All the data in the column will be lost.
  - You are about to drop the `dead_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[walletId,tokenAddress]` on the table `wallet_tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address,email]` on the table `wallets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenAddress` to the `wallet_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "wallet_tokens" DROP CONSTRAINT "wallet_tokens_tokenId_fkey";

-- DropIndex
DROP INDEX "wallet_tokens_walletId_tokenId_key";

-- AlterTable
ALTER TABLE "active_tokens" DROP COLUMN "holders",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "wallet_tokens" DROP COLUMN "tokenId",
ADD COLUMN     "price" TEXT,
ADD COLUMN     "tokenAddress" TEXT NOT NULL;

-- DropTable
DROP TABLE "dead_tokens";

-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NFT_walletId_address_key" ON "NFT"("walletId", "address");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_tokens_walletId_tokenAddress_key" ON "wallet_tokens"("walletId", "tokenAddress");

-- CreateIndex
CREATE INDEX "wallets_email_idx" ON "wallets"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_address_email_key" ON "wallets"("address", "email");

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
