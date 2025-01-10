DROP INDEX IF EXISTS "titleId";--> statement-breakpoint
DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "titlesId" ON "lection_Uploads" USING btree ("imageURL");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniq_idx" ON "lection_users" USING btree ("email");