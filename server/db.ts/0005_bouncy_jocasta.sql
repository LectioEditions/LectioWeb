ALTER TABLE "lection_impression" ALTER COLUMN "Quantite" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "lection_impression" ALTER COLUMN "NumTel" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "lection_impression" ALTER COLUMN "NumTel" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "lection_users" ADD COLUMN "impression" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "lection_cours" ADD COLUMN "Category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "lection_users" DROP COLUMN IF EXISTS "views";