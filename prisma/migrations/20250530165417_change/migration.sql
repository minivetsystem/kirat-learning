/*
  Warnings:

  - You are about to drop the column `authorBio` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `authorImage` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blogs` DROP COLUMN `authorBio`,
    DROP COLUMN `authorImage`;
