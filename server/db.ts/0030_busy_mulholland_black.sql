ALTER TABLE "lection_Order" ADD COLUMN "agenId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lection_Order" ADD CONSTRAINT "lection_Order_agenId_lection_users_clerkId_fk" FOREIGN KEY ("agenId") REFERENCES "public"."lection_users"("clerkId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
