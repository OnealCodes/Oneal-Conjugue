CREATE TABLE "verbs" (
	"infinitive" text PRIMARY KEY NOT NULL,
	"group" text NOT NULL,
	"level" text DEFAULT 'A1' NOT NULL,
	"present" jsonb NOT NULL
);
