CREATE TABLE IF NOT EXISTS "lection_CartItem" (
	"id" serial PRIMARY KEY NOT NULL,
	"Quantite" integer NOT NULL,
	"PdfUrl" text NOT NULL,
	"idItem" integer,
	"OrderId" integer,
	"userId" text,
	"Type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lection_Item" (
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
	"etat" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"Achat" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lection_Order" (
	"id" serial PRIMARY KEY NOT NULL,
	"Prix" integer,
	"NumTel" text NOT NULL,
	"PdfUrl" text NOT NULL,
	"Traite" boolean DEFAULT false NOT NULL,
	"etat" text NOT NULL,
	"userId" text,
	"imageURL" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "lection_cours";--> statement-breakpoint
DROP TABLE "lection_impression";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_CartItem" ADD CONSTRAINT "lection_CartItem_idItem_lection_Item_id_fk" FOREIGN KEY ("idItem") REFERENCES "public"."lection_Item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_CartItem" ADD CONSTRAINT "lection_CartItem_OrderId_lection_Order_id_fk" FOREIGN KEY ("OrderId") REFERENCES "public"."lection_Order"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_CartItem" ADD CONSTRAINT "lection_CartItem_userId_lection_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_Item" ADD CONSTRAINT "lection_Item_userId_lection_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_Order" ADD CONSTRAINT "lection_Order_userId_lection_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "titreId" ON "lection_Item" USING btree ("title");