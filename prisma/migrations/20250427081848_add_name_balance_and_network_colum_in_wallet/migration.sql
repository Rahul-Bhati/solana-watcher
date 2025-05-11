/*
  Warnings:

  - Added the required column `balance` to the `wallets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `wallets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "balance" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "network" TEXT NOT NULL;
