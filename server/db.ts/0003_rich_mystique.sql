CREATE TABLE IF NOT EXISTS "lection_impression" (
	"id" serial PRIMARY KEY NOT NULL,
	"audioURL" text NOT NULL,
	"userId" text,
	"imageURL" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_impression" ADD CONSTRAINT "lection_impression_userId_lection_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
