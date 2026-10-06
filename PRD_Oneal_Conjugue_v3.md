# **Oneal Conjugue! — French Conjugation Game**

**Product Requirements Document**
**Version:** 3.0
**Status:** Product Concept / Pre-production
**Author:** Oneal (Abisola Onileimo)
**Last Updated:** October 2026
**Supersedes:** v2.0 (September 2026)

---

# **0. What Changed in v3**

v2.0 defined an excellent learning model, but the game itself was structured as a quiz with a roleplay simulation as a late reward. v3 keeps every learning principle from v2.0 and changes the shape of the product:

| Area | v2.0 | v3.0 |
|---|---|---|
| Game format | Exercise-based game with a simulation unlock at the end | **3D story-driven world where the world is the game from minute one** |
| Role of simulation | Final stage (Learn → … → Master → Simulation) | **Built into every case.** Grand Simulations remain as mastery rewards |
| Core interaction | Quiz screens | **The Conjugation Workshop**: conjugation as a physical, visual build |
| Tense meaning | Explained in lessons | **Shown through consequences in the 3D world** |
| Mistakes | Explained and re-practised | Explained, re-practised, and returned as **Time Glitches** in the story |
| Curriculum | Listed by tense/mood | **Level map as a data file**, cross-checked against curricula, with production vs recognition status per form |
| Scope | A1–C2 with no build plan | **Vertical slice first**: A1 Chapter 1 |
| Story | None | One mystery told over six CEFR chapters |

**Non-negotiable principle for v3:**

> **Conjugation is the most important part of the game. The world, story and characters exist to make conjugation easier to learn, never to replace it.**

---

# **1. Product Overview**

**Oneal Conjugue!** is an original 3D story-driven game that takes a learner from **A1 to C2**, progressively developing the ability to recognise, understand, conjugate, choose and use French verbs across the relevant **tenses, moods and conjugation forms**.

It combines:

* A structured A1–C2 progression told as one story in six chapters
* A comprehensive, level-checked conjugation curriculum
* The **Conjugation Workshop**, a hands-on build mechanic for forms
* Story cases that require choosing and using forms in context
* Multiple-choice, assembly, typed and (later) spoken production
* Visible consequences: the world reacts to the tense or mood you choose
* Mistake tracking and targeted review
* Stars (performance) and Mastery (competence), kept separate
* Mixed-tense challenges and cumulative revision
* Audio and fading English support

The learning journey is:

> **Learn → Practise → Challenge → Master → Use**

and, in skill terms:

> **Recognise → Understand → Conjugate → Recall → Choose → Produce → Use**

In v3, these stages happen **inside the world**, as part of play, rather than in separate menus.

---

# **2. Product Vision**

Turn French conjugation from a memorisation-heavy subject into a **game of recognition, recall, decision-making and real use**, set in a world where tense and mood are not abstract rules but things the player can see change the world.

A learner should progress from:

> **“Which answer is correct?”**

to:

> **“What tense or mood do I need here?”**

and finally:

> **“I can use the right form naturally in this situation.”**

---

# **3. Problem Statement**

French conjugation requires learners to handle at once: verb endings, irregular patterns, tense formation, auxiliary selection, agreement, spelling changes, accents, subject-verb relationships, tense selection, mood selection, contextual meaning, formal versus informal usage, and common versus less common forms.

Traditional exercises focus on memorisation. A learner may complete:

> Je ___ (être) → suis

without being able to decide what form a real situation needs.

The most common reason learners abandon conjugation practice is that it feels like repetitive drills with no connection to meaning. v3 addresses this by making conjugation **the way the player acts in the world**, and by showing meaning through visible consequences.

---

# **4. Target Users**

**Primary:** French learners progressing from beginner to advanced.

**Secondary:**

* Students preparing for DELF/DALF or TCF
* Self-directed learners wanting extra conjugation practice
* Learners who enjoy games and story-driven experiences

**Learning range:** CEFR **A1 → C2**.

**Context note:** many learners will use mid-range Android phones with limited data, so performance, download size and offline play are product requirements, not afterthoughts (see §23).

---

# **5. Core Product Principles**

## **5.1 Conjugation first**

Every session must involve conjugation decisions for the large majority of its time. Story, exploration and characters support this; they never become a way to avoid it.

## **5.2 Recognition is not mastery**

Choosing the correct answer does not mean the player has mastered a form. The game must progressively require recognition, recall, conjugation, contextual understanding, independent production and application.

## **5.3 Mistakes are part of the learning system**

A wrong answer is never only a lost point. The player is told **why** it was wrong, gets another opportunity to demonstrate the correct understanding, and repeated mistakes shape future practice.

## **5.4 Previously learned material stays active**

Verbs and tenses learned earlier keep returning. *être* learned at A1 should reappear across every later tense and mood.

## **5.5 Not every form has equal practical importance**

The game distinguishes common spoken forms, frequent written forms, formal forms, advanced forms, and literary forms. Common forms receive extensive production and context practice. Rare or literary forms emphasise **recognition** and selective production.

## **5.6 Tense is shown, not only explained**

Whenever possible, the player should **see** what a tense does (a replay, a timeline, a changed scene), not only read a rule.

## **5.7 Levels are guidelines, not facts**

CEFR does not itself prescribe grammar by level. Curricula and course publishers place forms differently. The game therefore keeps its level placement in an **editable data file** and treats it as a reviewed, adjustable curriculum (see §14).

---

# **6. Learning Progression**

Each tense, mood or form follows:

> **Learn → Practise → Challenge → Master → Use**

| Stage | In v3, this happens… |
|---|---|
| **Learn** | A short in-world moment (about 60 seconds): a mentor, a clue or a machine explains the form with a table and examples |
| **Practise** | Guided Workshop builds and low-stakes cases with assistance |
| **Challenge** | Cases with fewer hints, distractors, traps and new verbs |
| **Master** | Multi-dimensional mastery check (see §20) |
| **Use** | Story cases and Grand Simulations where the player must choose and use the form unprompted |

Lessons must stay concise. They give the player just enough understanding to start playing.

---

# **7. The Conjugation Workshop (Core Mechanic)**

The Workshop is the game's signature interaction and the main vehicle for practice. Every verb form is a small, visible machine.

## **7.1 Parts**

* **Subject** (je, tu, il/elle/on, nous, vous, ils/elles)
* **Stem** (radical)
* **Ending** (terminaison)
* **Auxiliary** (avoir / être) for compound forms
* **Participle**
* **Agreement marker** (e, s, es) where needed

## **7.2 Interactions**

* The player **assembles** the form by placing parts together.
* A wrong ending visibly **does not fit**, so the error is seen before any text explains it.
* Changing the **subject** reshapes the machine, so patterns become visible.
* **Auxiliary choice** is a doorway: *avoir* verbs go through one gate, while *être* verbs live in the **Maison d'Être**, which also reinforces the movement and pronominal verbs.
* **Verb families** (prendre, apprendre, comprendre; venir, revenir, devenir; mettre, permettre, promettre) share a workbench and the same parts, so learning one unlocks the others.
* **Spelling-change verbs** (manger → *nous mangeons*, commencer → *nous commençons*, acheter, appeler, payer) have visible "adjustment pieces".

## **7.3 Assistance fades**

| Level of assistance | Player experience |
|---|---|
| **Assembly** | Parts provided; the player chooses and places them |
| **Table** | A conjugation table with gaps to fill |
| **Typing** | The player types the form (with an accent bar) |
| **Voice** (future) | The player says the form |
| **Unprompted** | The situation requires the form; the tense is not announced |

The system reduces assistance as the player improves and increases it after repeated errors.

## **7.4 Traps in the Workshop**

Look-alike parts appear as realistic mistakes: wrong accent, wrong spelling, wrong auxiliary, wrong subject ending, similar-looking tense, or a correct form used in the wrong context. A trap must represent a mistake a real learner could make and is never meant to be an unfair trick.

---

# **8. World and Story**

> **Working concept.** The story and setting below are a proposed direction and are listed in §31 as decisions to confirm. The structure (one story, six chapters, one per CEFR level) is the recommended design.

## **8.1 Premise (working)**

Time has broken in a 3D city. The player is a new apprentice **Conjugueur**, learning to repair it. The city's districts correspond to tenses and moods, and a central mystery asks **who broke time, and why**.

## **8.2 Districts as grammar**

| Area | Grammar idea | World expression |
|---|---|---|
| Place of the present | Présent | The live town square: everything is happening now |
| The Archives | Passé composé | Moments frozen like photographs: single completed events |
| The Mist Quarter | Imparfait | Looping memories, background scenes and habits |
| The Observatory | Futur proche, futur simple | Plans, schedules and predictions |
| The Garden of Mirrors | Conditionnel | Parallel "what if" worlds |
| The Storm District | Subjonctif | Weather that reacts to wishes, doubts and emotions |
| The Courthouse | Formal moods and tenses | Arguments, reported speech, precise choices |
| The Infinite Library | Literary forms | Reading and recognising novelistic French |

## **8.3 Verbs as characters**

Verbs are collectible, personified characters in a **Carnet de verbes**. Regular verbs are friendly and predictable. The irregular essentials (*être*, *avoir*, *aller*) are three main allies that the player befriends first. Verb families live together and unlock as groups.

## **8.4 Léo 🇫🇷**

Léo is the player's companion: guide, commentator and hint-giver. He reacts to correct answers, mistakes, streaks, mastery and unlocks, and he becomes part of the story rather than a pop-up.

## **8.5 Tone**

The tone matures with the player's level: light and playful at A1, mystery and detective at A2–B1, dramatic at B2, formal at C1, literary at C2. Humour is welcome, especially when a wrong form produces a harmless, memorable misunderstanding.

---

# **9. Chapter Structure (One Story, Six Chapters)**

The overarching mystery runs across all chapters, with each chapter revealing more of who broke time and why. Recurring characters reappear and their French becomes more sophisticated as the player's does. Earlier tenses keep returning in later cases.

| Level | Chapter (working title) | Story beat | Main forms (production) |
|---|---|---|---|
| **A1** | *L'Arrivée* | The player arrives in a city frozen in one moment and solves everyday cases | **Présent** (être, avoir, aller, faire, regular -er/-ir/-re, key irregulars, pronominal verbs), basic impératif, futur proche. **Late-chapter preview of passé composé** (avoir + regular participles only) |
| **A2** | *Les Archives* | The first cracks: something happened yesterday and no one agrees what | **Passé composé** (avoir, être, pronominal, irregular participles, agreement), basic **imparfait**, **futur simple**, passé récent, *être en train de*, full impératif, conditionnel de politesse |
| **B1** | *L'Enquête* | Real cases with timelines; a culprit's trail emerges | **Imparfait vs passé composé**, **plus-que-parfait**, **conditionnel présent**, impératif with pronouns, participle agreement; light **subjonctif présent** |
| **B2** | *Les Miroirs* | Parallel versions of the city; persuasion, doubt, emotion | **Subjonctif présent** (full), **conditionnel passé**, **futur antérieur**, **gérondif**, **passive**, **infinitif passé**, reported speech in the past, futur dans le passé; passé simple (recognition) |
| **C1** | *Le Tribunal* | A formal trial; arguments and reported speech decide the verdict | **Subjonctif passé**, nuanced tense/mood choice, formal register, advanced participial constructions |
| **C2** | *La Bibliothèque Infinie* | The final reveal inside a library of literary worlds | Selective stylistic production; **recognition** of imparfait du subjonctif, plus-que-parfait du subjonctif, passé antérieur, literary forms |

**Notes**

* A1 is mostly présent. Passé composé at A1 is a **limited preview, not part of the A1 mastery requirement.**
* Within each chapter, **free-roaming side cases** provide extra practice and replayability.

---

# **10. Case Structure (Missions)**

A **case** is the main unit of play: a short scene (about 3–7 minutes) with a goal, characters and conjugation decisions.

## **10.1 Case types**

| Type | Purpose |
|---|---|
| **Teaching case** | Introduces a form with strong guidance |
| **Practice case** | Guided use of the target form |
| **Challenge case** | Fewer hints, traps, unfamiliar verbs |
| **Mixed case** | Several learned forms with the tense **not announced** |
| **Glitch case** | Targets the player's recorded weak areas (see §17) |
| **Grand Simulation** | A larger scene unlocked by mastery milestones (see §13) |
| **Daily case** | A short daily loop for retention |

## **10.2 Case flow**

1. Scene opens with a character and a situation.
2. A line of dialogue creates a conjugation decision.
3. The player responds through the Workshop (assembly, table, typing or voice).
4. The world reacts: correct forms advance the scene, wrong forms produce a visible consequence.
5. Errors are explained and re-practised before the scene continues.
6. The case ends with stars, mastery updates and a story beat.

---

# **11. Consequences: Showing What Tenses Mean**

Visible consequences are what make the game teach usage, not only form.

| Choice | Consequence in the world |
|---|---|
| Passé composé vs imparfait | A **replay** shows what the player said. A single completed event plays as a snapshot, while imparfait fills the scene with background. A wrong tense produces a wrong replay, so the difference is **seen** |
| Plus-que-parfait | A **timeline** shows which event happened before another |
| Conditionnel | A **branch** previews the alternative outcome |
| Subjonctif | A character's mood, doubt or the storm weather reacts to wishes, necessity and emotion |
| Futur | A schedule or plan appears on a calendar |
| Impératif | Characters carry out the order |
| Wrong form | A **harmless, humorous misunderstanding** that the player then corrects |

---

# **12. Mixed-Tense Challenges**

Once several forms are learned, cases appear where the target tense or mood is **not announced**. For example, after learning présent, passé composé, imparfait, futur proche and futur simple:

> Quand j'étais petit, je ___ souvent au parc.

The player must determine that **imparfait** is needed. Later:

> Hier, nous ___ au cinéma.

requires **passé composé**. Mixed challenges grow to include many previously learned forms and, at higher levels, several grammatically plausible choices distinguished by context.

---

# **13. Grand Simulations**

Story cases already place the player in situations from A1. **Grand Simulations** are larger, more complex scenes that act as mastery rewards, in the same spirit as v2.0.

## **13.1 Unlock conditions**

A simulation can require mastery of one form, a related cluster, a number of stars, successful completion of a challenge case, or a combination.

> **Master Passé composé** + ⭐⭐⭐ → 🔓 **Simulation: Reconstituer la soirée**
> **Master Passé composé + Imparfait + Futur** + ⭐⭐⭐ in each → 🔓 **Simulation: Raconter sa vie**

## **13.2 Requirements**

Each simulation has a situation, characters, a visual environment, natural dialogue, player responses, conjugation requirements that arise from the situation, and consequences that change with the player's answers.

## **13.3 Progression**

* **Early levels:** the required form is obvious.
* **Intermediate:** several learned tenses may apply.
* **Advanced:** the player determines the tense or mood from context.
* **C1–C2:** formal communication, hypotheticals, doubt, necessity, emotion, argumentation, reported situations, complex temporal relationships, formal and literary language.

Simulations test **application**, not only conjugation recall. The player is not always told which tense to use.

## **13.4 Example (B1 interview-style case)**

> **Pouvez-vous me parler de votre expérience ?** → past forms (passé composé)
> **Qu'est-ce que vous faisiez dans votre ancien poste ?** → imparfait
> **Que feriez-vous si vous rencontriez un problème avec un client ?** → conditionnel présent

---

# **14. Conjugation Curriculum**

The curriculum is the heart of the product. It covers the major French conjugation system, with each form assigned an **introduction level**, a **production level**, a **consolidation level** and a **status** (production vs recognition-only).

## **14.1 Why the level map is data**

CEFR does not prescribe grammar by level. Curricula and course publishers differ (for example, some start passé composé at A2 and some preview it late in A1; some place plus-que-parfait at B1 and others at B2; the subjunctive is usually introduced lightly around B1 and developed at B2). The level map is therefore stored as a **data file** that can be adjusted without rebuilding the game and must be **reviewed by a qualified French teacher before launch.**

## **14.2 Level map (default)**

### **A1**

* **Produce:** Présent (être, avoir, aller, faire, regular -er/-ir/-re, key irregulars such as prendre, venir, pouvoir, vouloir), pronominal verbs in présent (*je m'appelle*), negatives and questions, basic impératif (tu/vous), futur proche
* **Fixed phrases:** *je voudrais*
* **Preview (not required for mastery):** passé composé with avoir and regular participles

### **A2**

* **Produce:** Passé composé (avoir and être, pronominal verbs, common irregular participles, agreement with être), imparfait (basic), futur simple, passé récent (*venir de*), *être en train de*, full impératif (including negative), conditionnel de politesse (*pourriez-vous*)
* **Light:** si + présent

### **B1**

* **Produce:** Imparfait vs passé composé, plus-que-parfait, conditionnel présent (si + imparfait), impératif with pronouns, participle agreement with a preceding object, reported speech in the present
* **Light introduction:** subjonctif présent (*il faut que*, *vouloir que*, common verbs)

### **B2**

* **Produce:** Subjonctif présent (all main triggers), subjunctive vs indicative, conditionnel passé (si + plus-que-parfait), futur antérieur, gérondif and participe présent, passive constructions, infinitif passé, tense agreement in reported speech, futur dans le passé
* **Recognition:** passé simple (third person, in reading)

### **C1**

* **Produce:** Subjonctif passé, nuanced selection between tenses and moods, formal register, advanced participial constructions
* **Recognition:** passé antérieur, wider passé simple

### **C2**

* **Selective production:** stylistic and formal use
* **Recognition only:** imparfait du subjonctif, plus-que-parfait du subjonctif, passé antérieur, other literary forms

## **14.3 Data fields for each form**

| Field | Meaning |
|---|---|
| `form_id` | Unique ID (for example `passe_compose`) |
| `introduced_level` | First CEFR level at which the form appears |
| `production_level` | Level at which the player must produce it |
| `consolidation_level` | Level at which it is expected to be solid |
| `mode` | `production` or `recognition_only` |
| `frequency_tier` | Everyday, written, formal, advanced, literary |
| `prerequisites` | Forms that should be learned first |
| `verb_groups` | Which verbs are used at each level |
| `teacher_reviewed` | Whether a qualified teacher has reviewed the entry |

## **14.4 Forms covered**

**Indicatif:** présent, passé composé, imparfait, plus-que-parfait, futur simple, futur antérieur, passé simple, passé antérieur (recognition).
**Constructions:** futur proche, passé récent, *être en train de*, futur dans le passé.
**Conditionnel:** présent, passé (and politeness uses).
**Subjonctif:** présent, passé, and literary forms (recognition).
**Impératif:** including negative forms and forms with pronouns.
**Non-finite and constructions:** infinitif présent and passé, participe présent and passé (with agreement), gérondif, passive, pronominal verbs, compound constructions, reported speech tense agreement.

---

# **15. Verb Progression**

Verb selection combines three principles.

## **15.1 Frequency**

Common verbs appear frequently: *être, avoir, aller, faire, pouvoir, vouloir, devoir, savoir, venir, prendre, dire, voir, mettre, partir.*

## **15.2 Verb families**

Related verbs are taught together so patterns can be reused: prendre → apprendre → comprendre; venir → revenir → devenir; mettre → permettre → promettre.

## **15.3 Regular and irregular progression**

Regular verbs come first (-er, then -ir, then -re), but irregular verbs essential to basic French appear early. **Spelling-change verbs** (manger, commencer, acheter, appeler, payer, préférer) are introduced progressively. Previously learned verbs keep returning in later tenses and moods.

---

# **16. Practice Modes**

The game uses a mixture of formats, introduced progressively.

| Mode | Description |
|---|---|
| **Assembly** | Build the form from its parts in the Workshop |
| **Multiple choice** | Select the correct form |
| **Fill in the blank** | Produce the missing form |
| **Conjugation table** | Complete missing forms |
| **Sentence transformation** | Change a sentence into a requested tense or structure |
| **Context selection** | Decide which tense or mood is appropriate |
| **Error detection** | Identify the incorrect conjugation |
| **Correction** | Fix an incorrect sentence |
| **Mixed-tense challenge** | Forms are not announced |
| **Production challenge** | Produce the form independently |
| **Voice** (future) | Say the form aloud |

---

# **17. Mistake System (Time Glitches)**

Every meaningful mistake is a learning opportunity.

1. **Explain.** State specifically why the answer was wrong, never just "Incorrect."
2. **Corrective practice.** Offer a related question or Workshop build.
3. **Track.** Record the mistake and its category.
4. **Return.** The weak area comes back as a **Time Glitch**, a recurring story element such as a character who keeps speaking in the form the player struggles with.

## **17.1 Mistake categories**

Wrong tense · wrong mood · wrong subject conjugation · wrong verb ending · wrong auxiliary · wrong agreement · spelling · accent · irregular conjugation · confusion between similar forms · incorrect contextual usage.

## **17.2 Explanation template**

Where useful, explanations include the conjugation table, the relevant rule, a comparison with the incorrect form, an example sentence, a usage note, and a reminder of previous related mistakes. **Explanations remain available until the player acknowledges them.**

## **17.3 Example**

> Player answers: *Hier, je mange au restaurant.*
> **Why it's wrong:** *Hier* signals a completed past event, which needs **passé composé**, not présent. Correct: *Hier, j'ai mangé au restaurant.*
> **Category:** Wrong tense.

---

# **18. Deliberate Traps**

Wrong answers represent realistic learner mistakes: wrong accent, spelling, tense, subject, ending or auxiliary; similar-looking conjugation; correct conjugation in the wrong context; indicative vs subjunctive confusion; conditional vs future confusion. Traps are never meant to be unfair tricks.

---

# **19. Stars**

Stars are the visible reward for **performance** on a case or challenge.

> ⭐ ⭐⭐ ⭐⭐⭐

Stars reflect accuracy, hints used and whether a previously recorded error was repeated. They are separate from mastery.

---

# **20. Mastery System**

Mastery measures **competence**, independently of stars.

## **20.1 Dimensions**

Recognition · conjugation accuracy · production · context selection · retention over time. Within each, the system also tracks coverage: regular and irregular verbs, all subjects, affirmative, negative and question forms, and mistake frequency.

## **20.2 Proposed default weighting (to be tuned in testing)**

| Dimension | Weight |
|---|---|
| Recognition | 15% |
| Conjugation accuracy | 25% |
| Production | 25% |
| Context selection | 20% |
| Retention | 15% |

## **20.3 Mastery rules (proposed)**

* A form counts as **Mastered** at **85% or above**, with minimum coverage of regular and irregular verbs and all subjects.
* **Retention checks** occur after roughly 3 days and 14 days. A failed check lowers mastery and schedules review.
* Recognition-only forms use recognition and context dimensions only.

## **20.4 Player-facing view**

Show **stars per case** and **one fluency meter per tense**. The detailed breakdown is one tap away:

> **Passé composé**
> ⭐⭐⭐ · Mastery 78%
> Recognition: Strong · Conjugation: Strong · Context: Developing · Production: Developing · Irregular verbs: Strong

---

# **21. Unlocking and Progression**

Progression combines **CEFR chapters** with **mastery**, but uses **soft gating** to avoid frustration in a 3D world.

* The player can **roam freely**. Cases and districts scale to the player's mastery instead of being hard-locked.
* The **main story** advances when chapter milestones are met.
* **Grand Simulations** unlock through mastery (see §13).
* Previously learned material stays available and keeps returning in revision.

---

# **22. Difficulty Progression**

| Level | Characteristics |
|---|---|
| **Beginner** | Familiar verbs, obvious contexts, strong guidance, assembly and multiple choice, short sentences |
| **Intermediate** | More verbs, irregulars, less obvious contexts, reduced guidance, production, mixed tenses |
| **Advanced** | Multiple plausible choices, nuanced contexts, formal language, less common verbs, complex structures |
| **C1–C2** | Nuanced tense and mood selection, formal and literary language, complex temporal relationships, advanced simulations, recognition of less common forms, selective production |

---

# **23. Platform, Performance and Technology**

## **23.1 Requirements**

* **Mobile-first**, targeting mid-range Android devices.
* **Stylised low-poly 3D**; fun comes from the loop, not graphical fidelity.
* **Small initial download** with chapters downloaded on demand.
* **Offline-first**: core play must work without a connection; sync progress when online.
* Data-driven content: curriculum, questions, dialogue and cases loaded from data files.

## **23.2 Engine options (to be decided)**

| Option | Notes |
|---|---|
| **Unity** | Mature mobile 3D tooling and large ecosystem |
| **Godot** | Lightweight and open source |
| **Three.js / Babylon.js** | Web-based; best for a very fast prototype to test whether the loop is fun |

## **23.3 Content pipeline**

* A **conjugation rules engine** generates correct forms and realistic wrong forms (traps) automatically.
* Hand-written content is limited to dialogue, explanations and story.
* A **qualified French teacher reviews** all curriculum entries, explanations and sample sentences before release.

---

# **24. Audio and Pronunciation**

Dialogue is spoken. The player can hear the correct conjugated sentence, key pronunciation contrasts and the sentence used in context. Regional variety (France, Québec, Francophone Africa) can be introduced over time. Voice input for production is a future goal. Audio complements conjugation and does not become a separate pronunciation course.

---

# **25. Translation Support**

| Level | Support |
|---|---|
| A1 | French + strong English support |
| A2 | French + moderate English support |
| B1 | French-first |
| B2 | Mostly French |
| C1–C2 | Primarily French |

---

# **26. Progress Dashboard**

The dashboard answers:

* **What do I know?**
* **What am I currently learning?**
* **Where am I weak?**
* **What can I unlock next?**

It shows CEFR level, tenses and moods, verb families (the Carnet de verbes), stars, mastery, weak areas, completed simulations, streak and historical performance.

---

# **27. Replayability and Retention**

* New questions and verbs on replay
* Mixed challenges and Glitch cases
* Timed challenges
* Simulation replay
* **Daily case** with a forgiving streak (no punishment for missing a day)
* Cumulative revision and master challenges
* Increasing difficulty

---

# **28. Game Modes**

**Story mode** (the main cases), **Workshop practice** (focused practice on one form), **Mastery challenge**, **Mixed challenge**, **Glitch review**, **Timed challenge**, **Grand Simulation**, **Master challenge** (large cumulative challenge).

---

# **29. Accessibility and Learner Support**

Players can repeat lessons, replay cases, review mistakes, practise mastered material, return to earlier levels, slow down, request extra examples, use audio support and view conjugation references. **The player is never punished for needing more practice.**

---

# **30. Success Criteria and Metrics**

## **30.1 Learning outcomes**

* **Learning:** players understand what a form does and how it is built
* **Accuracy:** players conjugate correctly
* **Retention:** performance holds when material returns after days
* **Transfer:** players use forms in new contexts
* **Judgment:** players choose the right tense or mood without being told
* **Production:** players produce forms independently
* **Application:** players use forms in simulations

## **30.2 Proposed measurable targets (to validate in testing)**

| Metric | Initial target |
|---|---|
| Vertical-slice completion (A1 Chapter 1) | At least 70% of test players finish |
| Mastery retention after 14 days | At least 70% of mastered forms still pass |
| Repeated-error reduction | Error rate on a tracked weak area falls across successive Glitch cases |
| Session conjugation share | Conjugation decisions occupy the large majority of session time |
| Fun rating (playtest survey) | Qualitative score collected for every test round |
| Day-7 return rate | Tracked from first public test |

Targets are starting hypotheses, not commitments.

---

# **31. Open Decisions**

| # | Decision | Default in this PRD |
|---|---|---|
| 1 | Story tone (mystery, exploration, magic) | Mystery-led, with a clockwork-city world |
| 2 | Player role (apprentice, detective, other) | Apprentice Conjugueur |
| 3 | City name, villain and central mystery | Not yet defined |
| 4 | Futur proche in A1 or A2 | A1 |
| 5 | Plus-que-parfait at B1 or B2 | Introduced late B1, consolidated B2 |
| 6 | Passé composé preview in A1 | Limited preview, not required for mastery |
| 7 | Engine and platform | Open; prototype first |
| 8 | Voice input | Future |
| 9 | Business model | Not decided |
| 10 | Teacher or reviewer for level map | To be appointed |

---

# **32. Risks**

| Risk | Mitigation |
|---|---|
| **Scope**: six full 3D chapters is very large | Build the vertical slice first; plan later chapters but build them only after validation |
| **Story overtakes conjugation** | Principle 5.1 and the session conjugation-share metric |
| **Device and data constraints** | Low-poly style, small downloads, offline-first |
| **Content volume** | Rules engine and trap generator; teacher review limited to reviewed templates |
| **Pedagogical accuracy** | Level map as data; qualified teacher review |
| **Level-map disagreement across sources** | Documented defaults and easy adjustment |
| **Voice recognition quality** | Defer until the core loop is validated |

---

# **33. Roadmap**

## **Phase 0: Prototype**
A quick, minimal prototype (possibly web-based) to test whether the Workshop and a consequence replay feel good.

## **Phase 1: Vertical slice (A1 Chapter 1)**
* One district
* Présent only (with the late-chapter passé composé preview)
* About 20 verbs and 8–10 cases
* The Workshop (assembly, table, typing)
* Explanations and the mistake loop
* One fluency meter per tense and star rewards
* First teacher review of the level map and sample content

## **Phase 2: A1 complete plus A2**
* Passé composé and imparfait, the Archives chapter
* Mixed-tense challenges
* First Glitch review system
* First Grand Simulation

## **Phase 3: B1–B2**
* Subjonctif, conditionnel, plus-que-parfait and compound forms
* Dashboard and retention checks
* Audio expansion

## **Phase 4: C1–C2**
* Formal, advanced and literary content
* Advanced simulations
* Voice input and exam modes (TCF-focused) if validated

---

# **34. Out of Scope (Initial Product)**

* General French grammar unrelated to conjugation
* A full vocabulary-learning system (the game uses **just enough vocabulary per scenario**)
* A standalone pronunciation course
* A general-purpose French dictionary
* Social networking as the primary experience
* Paid subscriptions as the central product concept
* Languages other than French in the initial version

---

# **35. Future Expansion**

More sophisticated simulations, expanded speaking and listening practice, examination simulation (TCF), personalised learning paths, community challenges, leaderboards and friend challenges (secondary to learning), additional languages and more advanced C1–C2 content.

---

# **36. Product North Star**

> **If a player has mastered a tense in the game, can they recognise it, conjugate it correctly, understand why it is used, and use it appropriately in a realistic French situation?**

If the answer is yes, the game has achieved its purpose.

---

# **37. Final Product Structure**

1. **📚 Learn:** understand the tense, mood or form through a short in-world moment
2. **🔧 Practise:** build forms in the Conjugation Workshop
3. **🧠 Master:** show independent knowledge across several dimensions
4. **🏆 Progress:** earn stars, advance through the story and A1–C2
5. **🎭 Use:** choose and use forms in story cases and Grand Simulations

**Oneal Conjugue! is a story-driven 3D French conjugation mastery game that takes the player from building individual verb forms to using them naturally in context.**

---

# **Appendix A: Sample Cases**

## **A1: Présent**

> **Marchand :** Bonjour ! Vous êtes nouveau ici ?
> **Player builds:** *Oui, je suis nouveau.*
> **Marchand :** Qu'est-ce que vous cherchez ?
> **Player builds:** *Je cherche la gare.*

## **A2: Passé composé and imparfait**

> **Témoin :** Hier soir, je ___ (rentrer) à 22 heures. → **suis rentré(e)** (être auxiliary, agreement)
> **Témoin :** Il pleuvait et la rue était vide. (imparfait: setting)

## **B1: Imparfait vs passé composé**

> Quand le voleur ___ (entrer), le gardien ___ (dormir). → **est entré** / **dormait**

## **B2: Subjonctif**

> Il faut que vous ___ (dire) la vérité. → **disiez**

## **C1: Formal**

> Bien que l'accusé ___ (mentir), le tribunal… → **ait menti** (subjonctif passé)

## **C2: Recognition**

> Il ouvrit la porte et s'avança. (passé simple)
> Il fallait qu'il partît. (imparfait du subjonctif)

*Sample sentences are illustrative and must pass teacher review before use.*

---

# **Appendix B: Change Log**

| Version | Date | Summary |
|---|---|---|
| 2.0 | September 2026 | Full learning model, mastery system, simulations |
| 3.0 | October 2026 | 3D story-driven format, Conjugation Workshop, level-checked curriculum map, vertical slice plan, metrics, risks and open decisions |
| 3.0 + decision note | 6 October 2026 | Documented database decision: PostgreSQL via local Docker (see Appendix C). No product requirements changed |

---

# **Appendix C: Decision Log — Database and Cost Principles (6 October 2026)**

> **Evaluator note — database decision.**
>
> * **PostgreSQL was selected** as the database for Oneal Conjugue!.
> * **PostgreSQL will run locally using Docker** (official PostgreSQL image via Docker Compose) for the current stage. The application and database remain local. **No Supabase or other hosted database** will be used at this stage.
> * **Why PostgreSQL instead of SQLite:** the project owner prefers to start with the production-suitable relational database from the beginning rather than migrate from SQLite later.
> * **Cost principle:** the project prioritizes **free and open-source tools and local development** wherever practical. Current stack (Next.js, TypeScript, Tailwind CSS, PostgreSQL, Docker, Better Auth for later, local file storage) is free/open-source and local.
> * **Paid services/subscriptions will not be introduced unnecessarily.** No paid accounts, subscriptions, or billable cloud resources will be created without explicit approval. Cloud file storage (Cloudflare R2 as a possible low-cost option) will only be evaluated later if local storage becomes insufficient. Deployment is out of scope for the current stage.
> * **Timing:** Docker/PostgreSQL is installed and configured only when implementation reaches the database setup phase. It was not installed for this documentation change.
