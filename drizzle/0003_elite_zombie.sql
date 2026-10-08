CREATE TABLE "attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"form_id" text NOT NULL,
	"correct" boolean NOT NULL,
	"kind" text DEFAULT 'chip' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "verbs" ADD COLUMN "subjonctif" jsonb;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;