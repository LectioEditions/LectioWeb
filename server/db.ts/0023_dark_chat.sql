CREATE TABLE IF NOT EXISTS "lection_Order" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" integer,
	"Prix" integer,
	"NumTel" text NOT NULL,
	"Adress" text NOT NULL,
	"Commune" text NOT NULL,
	"Traite" boolean DEFAULT false NOT NULL,
	"userId" text,
	"imageURL" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "lection_Orders";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_Order" ADD CONSTRAINT "lection_Order_userId_lection_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
