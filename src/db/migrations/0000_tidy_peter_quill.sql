ALTER TABLE "blogs" ADD COLUMN "image" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "image_type" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN "image_url";