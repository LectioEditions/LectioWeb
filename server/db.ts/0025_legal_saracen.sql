ALTER TABLE "lection_CartItem" ALTER COLUMN "OrderId" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "lection_Order" ALTER COLUMN "Prix" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "lection_Order" ALTER COLUMN "Prix" SET NOT NULL;