-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `verificationCode` VARCHAR(191) NULL,
    `verificationExpiresAt` DATETIME(3) NULL,
    `verificationResetCode` VARCHAR(191) NULL,
    `resetVerificationCodeExpiresAt` DATETIME(3) NULL,
    `resendCode` DATETIME(3) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `verificationTokenPageRest` VARCHAR(191) NULL,

    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
