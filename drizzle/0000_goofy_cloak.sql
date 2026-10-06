CREATE TABLE "cases" (
	"id" text PRIMARY KEY NOT NULL,
	"chapter" text NOT NULL,
	"title" text NOT NULL,
	"dialogue" jsonb
);
--> statement-breakpoint
CREATE TABLE "curriculum_forms" (
	"form_id" text PRIMARY KEY NOT NULL,
	"introduced_level" text NOT NULL,
	"production_level" text NOT NULL,
	"mode" text NOT NULL,
	"frequency_tier" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mistakes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"category" text NOT NULL,
	"details" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"profile_id" uuid NOT NULL,
	"form_id" text NOT NULL,
	"stars" integer DEFAULT 0 NOT NULL,
	"mastery" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "progress_profile_id_form_id_pk" PRIMARY KEY("profile_id","form_id")
);
--> statement-breakpoint
ALTER TABLE "mistakes" ADD CONSTRAINT "mistakes_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_form_id_curriculum_forms_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."curriculum_forms"("form_id") ON DELETE no action ON UPDATE no action;