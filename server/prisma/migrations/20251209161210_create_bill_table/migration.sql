-- CreateTable
CREATE TABLE `Bill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icon` TEXT NOT NULL,
    `phone` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `company` TEXT NOT NULL,
    `service` TEXT NOT NULL,
    `number` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `notes` TEXT NOT NULL DEFAULT 'لا يوجد ملاحظات',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
