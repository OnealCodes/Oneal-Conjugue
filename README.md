# Oneal Conjugue!

Progressive French conjugation mastery game, from A1 to C2.

> Learn a form. Practise it. Challenge it. Master it. Use it in context.

**Working product name:** Oneal Conjugue!
**Product type:** Language-learning game (French conjugation)
**Learning range:** CEFR A1 → C2
**Spec source:** `PRD_Oneal_Conjugue.md` (in this folder, v2.0, September 2026)

---

## Product Overview

Oneal Conjugue! is a French conjugation learning game designed to take a learner from **A1 to C2**, progressively developing the ability to recognise, understand, conjugate, and use French verbs across tenses, moods, and conjugation forms.

It is not intended to be a collection of conjugation quizzes. The central goal from the PRD is:

> Teach the player how French verbs work, train them to produce the correct forms, and ultimately make them use those forms naturally in context.

The specified learning journey is:

**Learn → Practise → Challenge → Master → Use (Simulation)**

Or in skill terms:

**Recognise → Understand → Conjugate → Recall → Choose → Produce → Use**

The final stage is the differentiator: the player must not only know that *j'ai mangé* is the passé composé of *manger*, but recognise when passé composé is appropriate and use it naturally in a conversation/roleplay.

The complete product is described in the PRD as five connected layers:

1. **Learn** — understand the tense/mood/form
2. **Practise** — build recognition and recall
3. **Master** — demonstrate independent knowledge and fix recurring mistakes
4. **Progress** — earn stars, unlock content, advance A1–C2
5. **Use** — apply language in roleplay simulations

---

## The Problem It Solves

French conjugation requires learners to handle at the same time:

verb endings, irregular patterns, tense formation, auxiliary selection, agreement, spelling changes, accents, subject/verb relationships, tense/mood selection, contextual meaning, formal vs informal usage, and common vs literary forms.

Traditional exercises focus heavily on memorisation. A learner may complete:

> Je ___ (être) → suis

without being able to decide what form is appropriate in a real sentence.

Oneal Conjugue! is specified to address this by moving the player progressively from **recognition to independent production and contextual use**, with cumulative revision, mistake-driven review, and contextual roleplay.

---

## Target Users

**Primary: French learners progressing from beginner to advanced (A1–C2)**

**Secondary:**

* Students preparing for French examinations
* Learners preparing for TCF or similar proficiency examinations
* Self-directed French learners
* Learners who want additional conjugation practice
* Users who enjoy language-learning games

The game should accommodate both beginners and advanced learners who need difficult conjugation and contextual practice.

---

## Core Functionality (as specified in PRD)

The PRD defines the following systems. None are implemented yet — this describes the specified product:

* **CEFR + mastery-based progression:** A1 → A2 → B1 → B2 → C1 → C2. Within each level, topics unlock via Learn → Practise → Challenge → Mastery milestone → Stars → New content / Simulation. Previously learned verbs/forms remain active and recur.
* **Conjugation curriculum:** Indicatif (présent, passé composé, imparfait, plus-que-parfait, futur simple/antérieur, passé simple, and others), futur proche, conditionnel présent/passé, subjonctif présent/passé (+ advanced/literary forms where appropriate), impératif, infinitif, participe présent/passé, gérondif, passive and compound constructions. Placement by frequency, difficulty, and level relevance.
* **Verb progression:** frequent verbs first (être, avoir, aller, faire, pouvoir, vouloir, devoir, savoir, venir, prendre), verb families (prendre/apprendre/comprendre, venir/revenir/devenir, mettre/permettre/promettre), regular before irregular except where irregulars are essential early.
* **Practice modes:** multiple choice, fill in the blank, conjugation table completion, sentence transformation, context selection (which tense/mood?), error detection, correction, mixed-tense challenge, production challenge. Introduced progressively.
* **Challenge with deliberate traps:** realistic learner mistakes as distractors — wrong accent/spelling/ending/auxiliary/subject, similar-looking forms, correct form in wrong context, indicative/subjunctive and future/conditional confusion.
* **Mistake system:** explain why the answer is wrong → corrective practice → track the weak area → return it in later practice. Categories include wrong tense/mood, subject conjugation, ending, auxiliary, agreement, spelling, accent, irregular, similar-form confusion, contextual misuse.
* **Stars vs Mastery (separate):** Stars (1–3) = performance/achievement on an activity. Mastery = separate competence across recognition, conjugation, context, production, regular/irregular, subjects, structures, mistake frequency, retention. Example from PRD: Passé composé ⭐⭐⭐ but Mastery 78%.
* **Mixed-tense challenges:** once several forms are learned, questions do not announce the target tense. Player must determine e.g. imparfait vs passé composé from context.
* **Roleplay simulations (unlockable reward):** realistic scenarios (restaurant, airport, hotel, workplace, job interview, university, doctor, travel, debate, etc.) with characters, visual context, dialogue, and consequences. Early levels make the required form obvious; intermediate mixes learned tenses; advanced/C1–C2 requires nuanced tense/mood choice, formal/literary language, doubt/necessity/emotion/argumentation/reported speech. Example in PRD: job interview testing présent + passé composé + imparfait + futur + conditionnel together.
* **Supporting systems:** mascot Léo for feedback, progress dashboard (CEFR, tenses, stars, mastery, weak areas, simulations, streak, history), audio/pronunciation as complement, English translations strong at A1 fading to primarily French at C1–C2, replayability via new questions/verbs, timed challenges, mistake review, cumulative revision.
* **Explanations:** answer why an answer is correct and why a wrong choice is wrong, with rule/table/comparison/example where useful, retained until acknowledged.

---

## Current Development Status

**Status: PRD stage — no implementation yet.**

What exists in this repo today:

* `PRD_Oneal_Conjugue.md` — full product requirements (45 sections, v2.0)
* `README.md` — this file

What does **not** exist yet:

* No application code (frontend / backend / game engine)
* No lessons, question bank, verb database, or simulations
* No mastery/stars/progress persistence, auth, or hosting setup
* No audio, graphics/animations, or tests
* No build scripts or deployment config
* No runnable app

This README therefore describes the **specified** product, not an implemented one.

---

## Planned / Future Features

From the PRD, to be built after the PRD stage:

1. Learning Mode (concise lessons with formation, usage, patterns, irregulars, tables)
2. Practice Mode (guided recognition → controlled production)
3. Mastery Challenge (multi-dimensional mastery gate)
4. Mixed Challenge (unannounced tense/mood selection)
5. Mistake Review (targeted weak-area practice)
6. Timed Challenge
7. Simulation (contextual roleplay)
8. Master Challenge (large cumulative revision)
9. Progress dashboard, stars, streaks, badges, unlocks
10. Audio support and reduced English dependency by level
11. C1–C2 advanced content, formal/literary forms

### Explicitly out of scope for the initial product concept (from PRD §42)

General French grammar unrelated to conjugation, full vocabulary system, standalone pronunciation course, general-purpose dictionary, social networking as primary experience, paid subscriptions as central concept, non-French languages.

### Longer-term ideas (from PRD §43)

More sophisticated roleplay, expanded speaking/listening, exam/TCF simulation modes, more C1/C2 content, personalised paths, additional languages, community challenges.

---

## Project Structure

```text
.
├── PRD_Oneal_Conjugue.md  # product requirements, v2.0
└── README.md              # this file
```

---

## Running the Project Locally

There is currently no code to run. To review the product definition:

```powershell
# 1. Clone (do not push unless requested)
git clone https://github.com/OnealCodes/Oneal-Conjugue.git
Set-Location -LiteralPath "Oneal-Conjugue"

# 2. Read the spec
notepad PRD_Oneal_Conjugue.md
notepad README.md

# 3. Check git status
git status
```

Once implementation starts, this section should be updated with prerequisites, install, env vars, and start commands.

---

## Next Steps for Implementation

* [ ] Decide stack (web/mobile, frontend, backend, DB, content format, hosting)
* [ ] Define data model for CEFR levels, tenses/moods, verbs, questions, mistakes, stars/mastery, simulations, progress
* [ ] Build vertical slice: A1 présent Learn → Practise → Challenge → Mastery
* [ ] Implement mistake tracking + explanations + review queue
* [ ] Implement stars (performance) separate from mastery (competence)
* [ ] Add mixed-tense challenge and first simulation unlock
* [ ] Add project scaffolding, .gitignore, license, tests

---

## License

No license file yet. Add one before public release.
