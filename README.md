# Oneal Conjugue!

3D story-driven French conjugation mastery game, from A1 to C2.

> Learn a form. Practise it. Challenge it. Master it. Use it in context.

**Working product name:** Oneal Conjugue!
**Product type:** Language-learning game (French conjugation)
**Learning range:** CEFR A1 → C2
**Spec source:** `PRD_Oneal_Conjugue_v3.md` in this folder (v3.0, October 2026)
**Status:** PRD / pre-production — no playable implementation yet (see Current Development Status)

v3.0 supersedes v2.0 (September 2026). The v2.0 file has been removed from this repo; v3 contains the v2-to-v3 comparison. This README describes v3.0.

---

## Product Overview

Oneal Conjugue! is an original 3D story-driven game that takes a learner from **A1 to C2**, developing the ability to recognise, understand, conjugate, choose, and use French verbs across relevant **tenses, moods, and conjugation forms**.

Non-negotiable principle from the PRD (v3 §5.1):

> Conjugation is the most important part of the game. The world, story and characters exist to make conjugation easier to learn, never to replace it.

What changed from v2.0 to v3.0:

* v2.0 was an exercise-based game with a roleplay simulation as a late reward.
* v3.0 is a **3D world where the world is the game from minute one**. Story cases already require choosing and using forms in context from A1. Larger Grand Simulations remain as mastery rewards.
* Core interaction is **The Conjugation Workshop**: conjugation as a physical, visual build (subject + stem + ending + auxiliary/participle/agreement).
* Tense meaning is **shown through consequences in the world** (replays, timelines, branches, weather), not only explained in lessons.
* Mistakes return as **Time Glitches** in the story.
* The curriculum is defined as a **level map data file**, adjustable without rebuilding the game.
* Scope is staged: **vertical slice first (A1 Chapter 1)**, then full A1–C2.

The learning journey is:

**Learn → Practise → Challenge → Master → Use**

Or in skill terms:

**Recognise → Understand → Conjugate → Recall → Choose → Produce → Use**

In v3 these stages happen **inside the world** as part of play.

---

## The Problem It Solves

French conjugation requires handling at once: verb endings, irregular patterns, tense formation, auxiliary selection, agreement, spelling changes, accents, subject-verb relationships, tense/mood selection, contextual meaning, formal vs informal usage, and common vs literary forms.

Traditional exercises focus on memorisation. A learner may complete:

> Je ___ (être) → suis

without being able to decide what form a real situation needs.

Learners also abandon conjugation practice because it feels like repetitive drills with no connection to meaning.

Oneal Conjugue! (v3) is specified to address this by:

* Making conjugation **the way the player acts in the world** (Workshop builds).
* Showing meaning through **visible consequences** — e.g. passé composé vs imparfait produces a different replay, plus-que-parfait shows a timeline, conditionnel previews a branch, subjonctif changes a character/weather reaction.
* Moving progressively from recognition to **independent production and contextual choice** (mixed-tense cases where the target tense is not announced).
* Keeping old verbs/forms active through cumulative revision and mistake-driven Glitch cases.
* Distinguishing everyday production forms from recognition-only literary forms.

---

## Target Users

**Primary:** French learners progressing from beginner to advanced (A1–C2).

**Secondary (from PRD v3 §4):**

* Students preparing for DELF/DALF or TCF
* Self-directed learners wanting extra conjugation practice
* Learners who enjoy games and story-driven experiences

**Context note (PRD v3 §4):** many learners will use mid-range Android phones with limited data, so performance, download size, and offline play are product requirements.

---

## Core Functionality (as specified in PRD v3 — not implemented)

None of the below is implemented yet. This is the specified product:

* **Conjugation Workshop (§7):** assemble Subject + Stem + Ending (+ Auxiliary / Participle / Agreement). Wrong endings visibly do not fit. Subject changes reshape the machine. Auxiliary choice is a doorway (avoir gate vs Maison d'Être). Verb families share workbenches. Spelling-change verbs have visible adjustment pieces. Assistance fades: Assembly → Table → Typing (+ accent bar) → Voice (future) → Unprompted.
* **World and story (§8–§9):** working concept — time has broken in a 3D city, player is apprentice Conjugueur. Districts express grammar (Present square, Passé composé Archives, Imparfait Mist Quarter, Futur Observatory, Conditionnel Garden of Mirrors, Subjonctif Storm District, Courthouse, Infinite Library). One mystery over six CEFR chapters. Verbs as collectible characters (Carnet de verbes). Léo 🇫🇷 as companion/guide.
* **Cases (§10):** 3–7 min missions — Teaching, Practice, Challenge, Mixed (tense not announced), Glitch (weak-area review), Grand Simulation, Daily case. Flow: scene → dialogue decision → Workshop response → world reaction → explanation/re-practice → stars/mastery update.
* **Consequences (§11):** world reacts to tense/mood choice; wrong forms cause harmless, humorous misunderstandings to correct.
* **Curriculum level map (§14):** indicatif, futur constructions, conditionnel, subjonctif, impératif, non-finite/passive/pronominal/reported-speech forms. Each form has `form_id, introduced_level, production_level, consolidation_level, mode (production/recognition_only), frequency_tier, prerequisites, verb_groups, teacher_reviewed`. Must be reviewed by a qualified French teacher before launch. A1 is mostly présent (+ basic impératif, futur proche, limited passé composé preview not required for mastery).
* **Verb progression (§15):** frequent verbs first (être, avoir, aller, faire, pouvoir, vouloir, devoir, savoir, venir, prendre, dire, voir, mettre, partir), verb families together, regulars before irregulars except essential early irregulars, spelling-change verbs progressively.
* **Practice modes (§16):** assembly, multiple choice, fill-in-blank, table, transformation, context selection, error detection, correction, mixed-tense, production, voice (future). Introduced progressively.
* **Mistake / Time Glitch system (§17):** explain why wrong → corrective practice → track category → return as story Glitch. Categories: wrong tense/mood, subject, ending, auxiliary, agreement, spelling, accent, irregular, similar-form confusion, contextual misuse. Explanations stay until acknowledged.
* **Deliberate traps (§18):** distractors mirror real learner errors, never unfair tricks.
* **Stars vs Mastery, separate (§19–§20):** Stars (1–3) = performance per case. Mastery = competence (proposed: Recognition 15%, Conjugation 25%, Production 25%, Context 20%, Retention 15%; Mastered ≥85%; retention checks ~3 and 14 days). Player view: stars per case + one fluency meter per tense.
* **Unlocking (§21):** soft gating — free roam, cases scale to mastery, main story advances on chapter milestones, Grand Simulations unlock via mastery/stars.
* **Supporting systems:** difficulty progression (§22), mobile-first low-poly 3D + offline-first + on-demand chapters (§23), spoken dialogue + fading English support A1→C2 (§24–§25), progress dashboard (§26), replayability/daily case (§27), accessibility / never punish extra practice (§29).

Content pipeline (specified): conjugation rules engine generates correct forms + traps; hand-written dialogue/explanations; teacher review of curriculum and samples.

---

## Current Development Status

**Status: PRD stage — no implementation yet.**

What exists in this repo today:

* `PRD_Oneal_Conjugue_v3.md` — current product requirements (v3.0, October 2026, 37 sections + appendices)
* `README.md` — this file
* `IMPLEMENTATION_PLAN.md` — phased build plan (PostgreSQL via local Docker)

What does **not** exist yet:

* No application code (no frontend / backend / game engine)
* No curriculum data file, verb database, question bank, or case/dialogue content
* No Workshop implementation, no 3D world/scenes
* No stars/mastery/progress persistence, auth, or hosting
* No audio, graphics/animations, or tests
* No build scripts or deployment config
* No runnable app
* No license file, no .gitignore

This README describes the **specified** product, not an implemented one. Planned features below are not built.

---

## Planned / Future Features

From PRD v3 roadmap (§33), in order:

1. **Phase 0 — Prototype:** minimal test (possibly web Three.js/Babylon.js) to validate Workshop + consequence replay is fun.
2. **Phase 1 — Vertical slice (A1 Chapter 1 *L'Arrivée*):** one district, présent only (+ late preview of passé composé with avoir + regular participles), ~20 verbs, 8–10 cases, Workshop (assembly/table/typing), explanations + mistake loop, stars + fluency meter, first teacher review.
3. **Phase 2 — A1 complete + A2 (*Les Archives*):** passé composé + imparfait, mixed-tense challenges, first Glitch review, first Grand Simulation.
4. **Phase 3 — B1–B2:** subjonctif, conditionnel, plus-que-parfait, compound forms, dashboard + retention checks, audio expansion.
5. **Phase 4 — C1–C2:** formal/advanced/literary content, advanced simulations, voice input and TCF exam modes if validated.

Game modes when built (§28): Story, Workshop practice, Mastery challenge, Mixed challenge, Glitch review, Timed challenge, Grand Simulation, Master challenge.

Explicitly out of scope for initial product (§34): general French grammar unrelated to conjugation, full vocabulary system (game uses just enough vocab per scenario), standalone pronunciation course, general dictionary, social networking as primary experience, paid subscriptions as central concept, non-French languages.

Longer-term ideas (§35, only after core loop is strong): sophisticated simulations, expanded speaking/listening, exam simulation, personalised paths, community challenges, leaderboards/friend challenges (secondary), additional languages.

Open decisions (§31, defaults in PRD): story tone = mystery-led clockwork city, role = apprentice Conjugueur, city/villain names TBD, futur proche in A1, plus-que-parfait late B1/consolidated B2, A1 passé composé preview limited, engine open/prototype-first, voice = future, business model undecided, teacher reviewer TBD.

---

## Project Structure

```text
.
├── app/                      # Phase 0 prototype (Next.js): page + layout + theme
├── components/               # Workshop, ConsequenceReplay, FunRating
├── lib/                      # demo-data.ts (fictional Phase 0 content only)
├── PRD_Oneal_Conjugue_v3.md  # current spec, v3.0 — source of truth
├── IMPLEMENTATION_PLAN.md    # phased build plan
├── design.html               # visual design reference (do not overwrite with app code)
├── package.json              # Next.js + React + Tailwind dependencies
└── README.md                 # this file
```

---

## Running the Project Locally

Phase 0 prototype (Next.js, no database yet). Prerequisites: Node.js 20+.

```powershell
# 1. Clone (do not push unless requested)
git clone https://github.com/OnealCodes/Oneal-Conjugue.git
Set-Location -LiteralPath "Oneal-Conjugue"

# 2. Install and run the Phase 0 prototype
npm install
npm run dev
# open http://localhost:3000 — Workshop loop + consequence replay + fun check

# 3. Production check
npm run build
```

To review the product definition: `PRD_Oneal_Conjugue_v3.md` (v3 is current).
To review the visual reference: open `design.html` directly in a browser.

---

## Next Steps for Implementation

* [x] Confirm v3.0 as source of truth (v2.0 file removed by owner)
* [x] Decide stack for Phase 0 prototype: Next.js + TypeScript + Tailwind (web)
* [x] Build Phase 0 prototype: Workshop assembly + one consequence replay (done, demo data only)
* [ ] Define data model for curriculum level map (`form_id, levels, mode, frequency_tier, prerequisites, verb_groups`) + verbs, cases, mistakes, stars/mastery
* [ ] Build vertical slice: A1 Chapter 1 Learn → Practise → Challenge → Mastery → Use
* [ ] Implement mistake tracking + Time Glitch review queue
* [ ] Implement stars (performance) separate from mastery (competence)
* [ ] Add project scaffolding, .gitignore, license, tests
* [ ] Appoint qualified French teacher to review level map and sample content

---

## License

No license file yet. Add one before public release.
