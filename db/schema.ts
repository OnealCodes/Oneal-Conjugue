import { pgTable, text, integer, timestamp, jsonb, uuid, primaryKey, boolean } from "drizzle-orm/pg-core";

// Local learner profiles (single-device for now; Better Auth later per plan).
export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Curriculum level-map entries (PRD §14 data fields, subset for Phase 1).
export const curriculumForms = pgTable("curriculum_forms", {
  formId: text("form_id").primaryKey(),
  introducedLevel: text("introduced_level").notNull(),
  productionLevel: text("production_level").notNull(),
  mode: text("mode").notNull(), // production | recognition_only
  frequencyTier: text("frequency_tier").notNull(),
});

// Per-learner progress: stars (performance) separate from mastery (competence).
export const progress = pgTable(
  "progress",
  {
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id),
    formId: text("form_id")
      .notNull()
      .references(() => curriculumForms.formId),
    stars: integer("stars").default(0).notNull(),
    mastery: integer("mastery").default(0).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.profileId, t.formId] })]
);

// Every attempt (Phase 3): powers recognition-vs-production dimensions.
export const attempts = pgTable("attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id),
  formId: text("form_id").notNull(),
  correct: boolean("correct").notNull(),
  kind: text("kind").notNull().default("chip"), // chip (recognition) | typed (production)
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Tracked mistakes for Time Glitch review (PRD §17 categories).
export const mistakes = pgTable("mistakes", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id),
  category: text("category").notNull(),
  details: jsonb("details"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Story cases (dialogue stored as JSON; hand-written content in later phases).
export const cases = pgTable("cases", {
  id: text("id").primaryKey(),
  chapter: text("chapter").notNull(),
  title: text("title").notNull(),
  dialogue: jsonb("dialogue"),
});

// A1 verb bank: infinitive + group + present-tense forms (je → ils).
export const verbs = pgTable("verbs", {
  infinitive: text("infinitive").primaryKey(),
  group: text("group").notNull(), // er | ir | re | irregular | spelling
  level: text("level").notNull().default("A1"),
  present: jsonb("present").notNull(), // { je, tu, il, nous, vous, ils }
  // Phase 2: compound + past/future tenses.
  auxiliary: text("auxiliary").notNull().default("avoir"), // avoir | être
  participle: text("participle"),
  imparfaitStem: text("imparfait_stem"),
  futurStem: text("futur_stem"), // null = regular (infinitive-based)
  subjonctif: jsonb("subjonctif"), // { je, tu, il, nous, vous, ils } or partial
});
