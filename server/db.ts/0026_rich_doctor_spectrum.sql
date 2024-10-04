ALTER TABLE "lection_Order" ALTER COLUMN "Prix" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "lection_Order" ADD COLUMN "temps" text DEFAULT '0';