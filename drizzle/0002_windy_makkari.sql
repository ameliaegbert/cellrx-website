CREATE TABLE `appointment_tracking` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ghlAppointmentId` varchar(128) NOT NULL,
	`ghlContactId` varchar(64) NOT NULL,
	`ghlCalendarId` varchar(128) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`email` varchar(320),
	`scheduledAt` bigint NOT NULL,
	`status` varchar(64) NOT NULL DEFAULT 'booked',
	`remindersEnqueued` boolean NOT NULL DEFAULT false,
	`noshowEnqueued` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointment_tracking_id` PRIMARY KEY(`id`),
	CONSTRAINT `appointment_tracking_ghlAppointmentId_unique` UNIQUE(`ghlAppointmentId`)
);
