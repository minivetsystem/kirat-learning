/*
  Warnings:

  - Made the column `authorId` on table `blogs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `blogs` DROP FOREIGN KEY `blogs_authorId_fkey`;

-- DropIndex
DROP INDEX `blogs_authorId_fkey` ON `blogs`;

-- AlterTable
ALTER TABLE `blogs` MODIFY `authorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
