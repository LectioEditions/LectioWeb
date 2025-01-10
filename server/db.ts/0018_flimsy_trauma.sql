CREATE TABLE IF NOT EXISTS "lection_CartItems" (
	"id" serial PRIMARY KEY NOT NULL,
	"Quantite" integer NOT NULL,
	"PdfUrl" text NOT NULL,
	"idItem" integer,
	"OrderId" integer,
	"userId" text,
	"Type" text NOT NULL,
	"Prix" integer
);
--> statement-breakpoint
DROP TABLE "lection_CartItem";