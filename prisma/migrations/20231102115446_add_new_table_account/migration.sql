/*
  Warnings:

  - The primary key for the `balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `operation_id` on the `balance` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `balance` table. All the data in the column will be lost.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `operation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `account_id` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operation` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidOut` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `balance` DROP FOREIGN KEY `Balance_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `balance` DROP FOREIGN KEY `Balance_operation_id_fkey`;

-- DropForeignKey
ALTER TABLE `balance` DROP FOREIGN KEY `Balance_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_user_id_fkey`;

-- AlterTable
ALTER TABLE `balance` DROP PRIMARY KEY,
    DROP COLUMN `operation_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `account_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `operation` ENUM('REVENUE', 'EXPENSE', 'DEBT') NOT NULL,
    ADD COLUMN `paidOut` BOOLEAN NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `category_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `operation`;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Balance` ADD CONSTRAINT `Balance_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Balance` ADD CONSTRAINT `Balance_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
