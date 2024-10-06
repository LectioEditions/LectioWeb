CREATE TABLE IF NOT EXISTS "lection_Orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" text,
	"Prix" integer DEFAULT 0,
	"NumTel" text NOT NULL,
	"Adress" text NOT NULL,
	"Commune" text NOT NULL,
	"Traite" boolean DEFAULT false NOT NULL,
	"temps" text DEFAULT '0',
	"userId" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "lection_Order";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_Orders" ADD CONSTRAINT "lection_Orders_userId_lection_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
