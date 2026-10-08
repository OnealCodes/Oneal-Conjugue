# Oneal Conjugue! — Implementation Plan

**Spec source:** `PRD_Oneal_Conjugue_v3.md` (v3.0, October 2026)
**Status:** Planning only — no application built yet.
**Local-first:** application and database run locally. No deployment at this stage.

---

## 1. What already exists

- `PRD_Oneal_Conjugue_v3.md` — current product spec (v3.0)
- `README.md` — GitHub intro, v3-accurate
- `IMPLEMENTATION_PLAN.md` — this file
- Note: v2.0 spec file was removed by the owner; v3 contains the v2-to-v3 comparison.

## 2. What still needs to be built

- Next.js + TypeScript + Tailwind frontend (including Workshop UI and 3D prototype views)
- Next.js Route Handlers backend (cases, mastery, mistakes, progress)
- PostgreSQL schema + local Docker setup (when database phase starts)
- Authentication with Better Auth (when user accounts are needed)
- Curriculum level-map data files, verb database, case/dialogue content
- Stars/Mastery logic, Time Glitch review, dashboard, audio/assets
- Tests, .gitignore, license, local run scripts

No code, database, or prototype exists yet.

---

## 3. Phases and deliverables

### Phase 0 — Prototype validation (no database yet)

**Status (7 Oct 2026): built and verified.** Next.js page at `/` with Workshop loop
(`components/Workshop.tsx`), consequence replay (`components/ConsequenceReplay.tsx`)
and fun check (`components/FunRating.tsx`), all on fictional demo data
(`lib/demo-data.ts`). `npm run build` passes; production page served locally with
HTTP 200 and all content present. No database, no auth — per plan.

Outputs when complete:

- Minimal Next.js page proving the Workshop loop (assemble Subject + Stem + Ending)
- One consequence replay (e.g. passé composé vs imparfait shows different replay)
- Playtest fun rating collected

Database setup not required here. Do not set up PostgreSQL just for this phase.

### Phase 1 — Vertical slice: A1 Chapter 1 *L'Arrivée*

**Status (7 Oct 2026): database foundation done.** PostgreSQL 16 runs locally in
Docker (`oneal-conjugue-db`, host port 5433 — 5432 belongs to another local
project and was left untouched). Schema migrated: profiles, curriculum_forms,
progress (stars separate from mastery), mistakes, cases. Drizzle ORM wired;
`GET /api/health` verified live against the DB. Remaining: A1 cases content,
stars/mastery logic, dashboard, teacher review.

**Status (7 Oct 2026): slice playable end-to-end.** Seeded verb bank (20 verbs,
présent forms), 3 curriculum forms, 8 A1 cases (16 turns, incl. passé composé
preview). APIs: `/api/cases`, `/api/attempts` (mastery +8/−2, mistake rows),
`/api/stars` (best-of), `/api/progress`. Pages: `/jouer` (case player with
explanations + stars) and `/progres` (fluency meters, stars, mistake bank).
Verified: production build, live attempt→mastery→mistake→dashboard round-trip.
Remaining: teacher review of the level map and sample content.

**Status (7 Oct 2026): Phase 2 content playable end-to-end.** Verb bank grown to
32 (participles, auxiliaries, imparfait/futur stems via `lib/conjugate.ts`);
5 curriculum forms (présent, futur proche, passé composé, imparfait, futur);
15 cases (8 A1 + 6 A2 + sim1). New: mixed-tense turns (tense not announced),
`/revision` Glitch review built from real mistake rows, `/simulation` first
Grand Simulation gated at présent mastery ≥ 50 %, retention `dueForReview`
flags after 3 untouched days. Verified: build, glitch round-trip, retention
flag, all pages HTTP 200. Test data reset. Remaining: teacher review.

**Status (7 Oct 2026): Phase 3 content playable end-to-end.** Verb bank grown
to 36 (subjonctif forms stored explicitly; conditionnel = futur stem +
imparfait endings; PQP/futur antérieur/conditionnel passé in
`lib/conjugate.ts` with être agreement); 10 curriculum forms; 21 cases incl.
6 B1–B2 cases (subjonctif triggers, si+imparfait→conditionnel, PQP timelines,
futur antérieur, mixed). New: `attempts` log with chip-vs-typed kinds,
dashboard recognition/production dimensions, free Web Speech audio (🔊) on
turns, pronominal verb demo (se lever). Verified: engine cross-check 46/46
(1 imperative-pronoun turn intentionally exempt), build, dimensions
round-trip, all pages HTTP 200. Simplifications kept: masculine default
agreement, +8/−2 mastery, single local profile. Remaining: teacher review,
native audio later.

Outputs when complete:

- Next.js app running locally (frontend + Route Handlers)
- PostgreSQL running locally in Docker (see §5)
- Tables for profiles, curriculum progress, stars/mastery, mistakes, cases
- Présent only (+ limited passé composé preview), ~20 verbs, 8–10 cases
- Workshop (assembly / table / typing), explanations + mistake loop
- Stars + one fluency meter per tense
- Teacher review of level map

### Phase 2 — A1 complete + A2 *Les Archives*

Outputs when complete:

- Full passé composé + basic imparfait/futur
- Mixed-tense cases, first Glitch review, first Grand Simulation
- Retention checks begin

### Phase 3 — B1–B2

Outputs when complete:

- Subjonctif, conditionnel, plus-que-parfait, compound forms
- Dashboard, audio expansion

### Phase 4 — C1–C2

**Status (7 Oct 2026): content playable end-to-end.** 14 curriculum forms
(+ subjonctif passé production; passé simple / imparfait du subjonctif /
passé antérieur recognition-only); 27 cases incl. 5 C-level cases (formal
register, literary recognition, nuanced indicatif/subjonctif) + sim2
« Le Tribunal » gated at subjonctif mastery ≥ 50 %. `/simulation` now lists
all sims with per-sim unlock rules. Voice input and TCF modes explicitly
deferred (PRD: only if validated). Verified: engine cross-check 58/58
(4 intentionally exempt: 3 recognition + 1 imperative), build, sim2 unlock
flow (56 → unlocked), all pages HTTP 200. Test data reset.

**Review note:** no external teacher available; owner (B1) reviews what they
can. C1–C2 content is engine-verified but expert review is still recommended
before calling it final.

---

## 4. Final proposed technology stack (local only)

| Area | Choice | Notes |
|---|---|---|
| Frontend | Next.js + TypeScript + Tailwind CSS | Local-first web app; 3D via web libraries when prototype needs it |
| Backend | Next.js Route Handlers | Same repo, runs on localhost; no separate server to deploy |
| Database | PostgreSQL | Runs locally in Docker when database phase starts; no hosted DB |
| Database local env | Docker + Docker Compose | `postgres` service only; data in a Docker volume, not in git |
| Authentication | Better Auth | Free/open-source; only wired up when accounts are actually needed |
| File storage (MVP) | Local `uploads/` / `public/assets/` folder | Curriculum JSON, dialogue, images, audio stay in the project |
| Cloud file storage | Deferred; Cloudflare R2 to be evaluated later if needed | Low-cost option only, only if local storage stops being enough |
| Deployment | Out of scope | Everything runs on `localhost` for now |

---

## 5. Local PostgreSQL + Docker plan (for when it is needed)

- Add `docker-compose.yml` with a single `postgres` service (official PostgreSQL image).
- App connects via `DATABASE_URL` in local `.env` (never committed).
- Schema managed with migrations (e.g. Prisma or Drizzle — to be chosen at implementation time).
- No Supabase or hosted database for the current stage.
- Do not install/start Docker or PostgreSQL until implementation reaches the database setup phase (Phase 1).

---

## 6. Cost principle

Follow for the entire game:

1. Prefer free/open-source options first.
2. Prefer tools that run locally.
3. If a paid service is genuinely needed later, prefer low-cost or pay-as-you-go.
4. Do not create paid accounts, subscriptions, or billable cloud resources without asking first.
5. Do not choose an expensive tool when a suitable free/inexpensive alternative exists.
6. Do not install software until its implementation phase actually requires it.

Current choices comply: Next.js, TypeScript, Tailwind, PostgreSQL, Docker, and Better Auth are free/open-source and run locally. No paid services are planned.
