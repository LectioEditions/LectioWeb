ALTER TABLE "lection_cours" RENAME COLUMN "audioURL" TO "PdfUrl";--> statement-breakpoint
ALTER TABLE "lection_cours" RENAME COLUMN "views" TO "Impression";--> statement-breakpoint
ALTER TABLE "lection_impression" RENAME COLUMN "audioURL" TO "Adress";--> statement-breakpoint
ALTER TABLE "lection_impression" ADD COLUMN "Commune" text NOT NULL;--> statement-breakpoint
ALTER TABLE "lection_impression" ADD COLUMN "Quantite" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "lection_impression" ADD COLUMN "NumTel" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "lection_impression" ADD COLUMN "PdfUrl" text NOT NULL;