ALTER TABLE "lection_Order" RENAME COLUMN "PdfUrl" TO "Adress";--> statement-breakpoint
ALTER TABLE "lection_Order" ADD COLUMN "Commune" text NOT NULL;