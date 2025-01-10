CREATE TABLE IF NOT EXISTS "lection_Items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"Category" text NOT NULL,
	"description" text NOT NULL,
	"Annee" text NOT NULL,
	"Module" text NOT NULL,
	"Type" text NOT NULL,
	"PdfUrl" text NOT NULL,
	"userId" text,
	"imageURL" text NOT NULL,
	"Prix" integer,
	"etat" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"Achat" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DROP TABLE "lection_Item";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_Items" ADD CONSTRAINT "lection_Items_userId_lection_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "titreId" ON "lection_Items" USING btree ("title");