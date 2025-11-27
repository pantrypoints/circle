DROP INDEX "users_codename_unique";--> statement-breakpoint
ALTER TABLE `products` ALTER COLUMN "category" TO "category" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_codename_unique` ON `users` (`codename`);--> statement-breakpoint
ALTER TABLE `services` ALTER COLUMN "category" TO "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` ADD `category` text NOT NULL;