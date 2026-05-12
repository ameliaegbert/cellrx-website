CREATE TABLE `nurture_queue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ghlContactId` varchar(64) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`email` varchar(320),
	`sequenceType` enum('stem-cell','black-label','appt-remind','no-show') NOT NULL,
	`stepNumber` int NOT NULL DEFAULT 1,
	`totalSteps` int NOT NULL,
	`sendAt` bigint NOT NULL,
	`sentAt` bigint,
	`failed` boolean NOT NULL DEFAULT false,
	`failReason` text,
	`appointmentTime` bigint,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nurture_queue_id` PRIMARY KEY(`id`)
);
