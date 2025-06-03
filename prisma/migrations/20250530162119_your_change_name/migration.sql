/*
  Warnings:

  - Added the required column `author` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blogs` ADD COLUMN `author` VARCHAR(100) NOT NULL,
    ADD COLUMN `authorBio` TEXT NULL,
    ADD COLUMN `authorEmail` VARCHAR(255) NULL,
    ADD COLUMN `authorImage` VARCHAR(191) NULL,
    ADD COLUMN `views` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `view_events` (
    `id` VARCHAR(191) NOT NULL,
    `blogId` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(45) NULL,
    `userAgent` TEXT NULL,
    `referer` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `country` VARCHAR(2) NULL,
    `city` VARCHAR(100) NULL,
    `device` VARCHAR(50) NULL,
    `browser` VARCHAR(50) NULL,

    INDEX `view_events_blogId_idx`(`blogId`),
    INDEX `view_events_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `analytics_summaries` (
    `id` VARCHAR(191) NOT NULL,
    `blogId` VARCHAR(191) NOT NULL,
    `totalViews` INTEGER NOT NULL DEFAULT 0,
    `uniqueVisitors` INTEGER NOT NULL DEFAULT 0,
    `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dailyViews` JSON NULL,
    `weeklyViews` JSON NULL,
    `monthlyViews` JSON NULL,

    UNIQUE INDEX `analytics_summaries_blogId_key`(`blogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `view_events` ADD CONSTRAINT `view_events_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `blogs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
