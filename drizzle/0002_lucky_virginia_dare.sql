ALTER TABLE "verbs" ADD COLUMN "auxiliary" text DEFAULT 'avoir' NOT NULL;--> statement-breakpoint
ALTER TABLE "verbs" ADD COLUMN "participle" text;--> statement-breakpoint
ALTER TABLE "verbs" ADD COLUMN "imparfait_stem" text;--> statement-breakpoint
ALTER TABLE "verbs" ADD COLUMN "futur_stem" text;