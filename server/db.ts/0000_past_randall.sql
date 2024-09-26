CREATE TABLE IF NOT EXISTS "lection_Uploads" (
	"id" serial PRIMARY KEY NOT NULL,
	"imageURL" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lection_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text NOT NULL,
	"clerkId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"podcastCount" integer DEFAULT 0 NOT NULL,
	"views" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lection_cours" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"audioURL" text NOT NULL,
	"userId" text,
	"imageURL" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"views" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_cours" ADD CONSTRAINT "lection_cours_userId_lection_users_clerkId_fk" FOREIGN KEY ("userId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "titleId" ON "lection_Uploads" USING btree ("imageURL");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "lection_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "titreId" ON "lection_cours" USING btree ("title");