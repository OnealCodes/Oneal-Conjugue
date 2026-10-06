import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "./index";
import { verbs, curriculumForms, cases, profiles } from "./schema";

// A1 verb bank: infinitive + group + présent forms (je → ils).
// Checked against standard Bescherelle conjugations.
const VERBS: { infinitive: string; group: string; present: Record<string, string> }[] = [
  { infinitive: "être", group: "irregular", present: { je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont" } },
  { infinitive: "avoir", group: "irregular", present: { je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont" } },
  { infinitive: "aller", group: "irregular", present: { je: "vais", tu: "vas", il: "va", nous: "allons", vous: "allez", ils: "vont" } },
  { infinitive: "faire", group: "irregular", present: { je: "fais", tu: "fais", il: "fait", nous: "faisons", vous: "faites", ils: "font" } },
  { infinitive: "parler", group: "er", present: { je: "parle", tu: "parles", il: "parle", nous: "parlons", vous: "parlez", ils: "parlent" } },
  { infinitive: "travailler", group: "er", present: { je: "travaille", tu: "travailles", il: "travaille", nous: "travaillons", vous: "travaillez", ils: "travaillent" } },
  { infinitive: "chercher", group: "er", present: { je: "cherche", tu: "cherches", il: "cherche", nous: "cherchons", vous: "cherchez", ils: "cherchent" } },
  { infinitive: "finir", group: "ir", present: { je: "finis", tu: "finis", il: "finit", nous: "finissons", vous: "finissez", ils: "finissent" } },
  { infinitive: "partir", group: "ir", present: { je: "pars", tu: "pars", il: "part", nous: "partons", vous: "partez", ils: "partent" } },
  { infinitive: "vendre", group: "re", present: { je: "vends", tu: "vends", il: "vend", nous: "vendons", vous: "vendez", ils: "vendent" } },
  { infinitive: "prendre", group: "irregular", present: { je: "prends", tu: "prends", il: "prend", nous: "prenons", vous: "prenez", ils: "prennent" } },
  { infinitive: "venir", group: "irregular", present: { je: "viens", tu: "viens", il: "vient", nous: "venons", vous: "venez", ils: "viennent" } },
  { infinitive: "pouvoir", group: "irregular", present: { je: "peux", tu: "peux", il: "peut", nous: "pouvons", vous: "pouvez", ils: "peuvent" } },
  { infinitive: "vouloir", group: "irregular", present: { je: "veux", tu: "veux", il: "veut", nous: "voulons", vous: "voulez", ils: "veulent" } },
  { infinitive: "devoir", group: "irregular", present: { je: "dois", tu: "dois", il: "doit", nous: "devons", vous: "devez", ils: "doivent" } },
  { infinitive: "savoir", group: "irregular", present: { je: "sais", tu: "sais", il: "sait", nous: "savons", vous: "savez", ils: "savent" } },
  { infinitive: "dire", group: "irregular", present: { je: "dis", tu: "dis", il: "dit", nous: "disons", vous: "dites", ils: "disent" } },
  { infinitive: "voir", group: "irregular", present: { je: "vois", tu: "vois", il: "voit", nous: "voyons", vous: "voyez", ils: "voient" } },
  { infinitive: "mettre", group: "irregular", present: { je: "mets", tu: "mets", il: "met", nous: "mettons", vous: "mettez", ils: "mettent" } },
  { infinitive: "manger", group: "spelling", present: { je: "mange", tu: "manges", il: "mange", nous: "mangeons", vous: "mangez", ils: "mangent" } },
];

const FORMS = [
  { formId: "present", introducedLevel: "A1", productionLevel: "A1", mode: "production", frequencyTier: "everyday" },
  { formId: "futur_proche", introducedLevel: "A1", productionLevel: "A1", mode: "production", frequencyTier: "everyday" },
  // Passé composé: limited A1 preview (avoir + regular participles, not mastery) → full production at A2.
  { formId: "passe_compose", introducedLevel: "A1", productionLevel: "A2", mode: "production", frequencyTier: "everyday" },
];

interface Turn {
  prompt: string;
  gloss: string;
  verb: string;
  subject: string;
  answer: string;
  distractors: string[];
  explanation: string;
  preview?: boolean;
}

function turn(prompt: string, gloss: string, verb: string, subject: string, answer: string, distractors: string[], explanation: string, preview = false): Turn {
  return { prompt, gloss, verb, subject, answer, distractors, explanation, preview };
}

const CASES: { id: string; chapter: string; title: string; scene: string; sceneGloss: string; turns: Turn[] }[] = [
  {
    id: "a1c1", chapter: "A1", title: "Bienvenue sur la place",
    scene: "Marchand : Bonjour ! Vous êtes nouveau ici ?", sceneGloss: "Hello! Are you new here?",
    turns: [
      turn("Oui, je ___ (être) nouveau.", "Yes, I am new.", "être", "je", "suis",
        ["es", "est", "sommes", "êtes", "sont"], "Avec « je », être au présent donne « suis » : je suis, tu es, il est."),
      turn("Tu ___ (avoir) raison ?", "Are you right?", "avoir", "tu", "as",
        ["ai", "a", "avons", "avez", "ont"], "Avec « tu », avoir au présent donne « as » : j'ai, tu as, il a."),
    ],
  },
  {
    id: "a1c2", chapter: "A1", title: "Le marchand",
    scene: "Marchand : Qu'est-ce que vous cherchez ?", sceneGloss: "What are you looking for?",
    turns: [
      turn("Je ___ (aller) à la gare.", "I'm going to the station.", "aller", "je", "vais",
        ["vas", "va", "allons", "allez", "vont"], "Avec « je », aller au présent donne « vais » : je vais, tu vas, il va."),
      turn("Vous ___ (parler) français ?", "Do you speak French?", "parler", "vous", "parlez",
        ["parle", "parles", "parlons", "parlent"], "Avec « vous », les verbes en -er prennent « -ez » : vous parlez."),
    ],
  },
  {
    id: "a1c3", chapter: "A1", title: "La boulangerie",
    scene: "Boulangère : Bonjour ! Je peux vous aider ?", sceneGloss: "Hello! Can I help you?",
    turns: [
      turn("Je ___ (faire) les courses.", "I'm doing the shopping.", "faire", "je", "fais",
        ["fait", "faisons", "faites", "font"], "Avec « je », faire au présent donne « fais » : je fais, tu fais, il fait."),
      turn("Nous ___ (prendre) deux baguettes.", "We'll take two baguettes.", "prendre", "nous", "prenons",
        ["prends", "prend", "prenez", "prennent"], "Avec « nous », prendre donne « prenons » : je prends, nous prenons."),
    ],
  },
  {
    id: "a1c4", chapter: "A1", title: "Le retour",
    scene: "Léo : Il est tard. On rentre ?", sceneGloss: "It's late. Shall we go home?",
    turns: [
      turn("Tu ___ (venir) avec moi ?", "Are you coming with me?", "venir", "tu", "viens",
        ["vient", "venons", "venez", "viennent"], "Avec « tu », venir donne « viens » : je viens, tu viens, il vient."),
      turn("Je ___ (pouvoir) aider.", "I can help.", "pouvoir", "je", "peux",
        ["peut", "pouvons", "pouvez", "peuvent"], "Avec « je », pouvoir donne « peux » (x silent) : je peux, tu peux, il peut."),
    ],
  },
  {
    id: "a1c5", chapter: "A1", title: "Le café",
    scene: "Serveuse : Vous désirez ?", sceneGloss: "What would you like?",
    turns: [
      turn("Je ___ (vouloir) un café.", "I'd like a coffee.", "vouloir", "je", "veux",
        ["veut", "voulons", "voulez", "veulent"], "Avec « je », vouloir donne « veux » : je veux, tu veux, il veut."),
      turn("Nous ___ (devoir) partir.", "We must leave.", "devoir", "nous", "devons",
        ["dois", "doit", "devez", "doivent"], "Avec « nous », devoir donne « devons » : je dois, nous devons."),
    ],
  },
  {
    id: "a1c6", chapter: "A1", title: "Les amis",
    scene: "Amie : Tu connais la réponse ?", sceneGloss: "Do you know the answer?",
    turns: [
      turn("Tu ___ (savoir) la réponse ?", "Do you know the answer?", "savoir", "tu", "sais",
        ["sait", "savons", "savez", "savent"], "Avec « tu », savoir donne « sais » : je sais, tu sais, il sait."),
      turn("Ils ___ (dire) bonjour.", "They say hello.", "dire", "ils", "disent",
        ["dis", "dit", "disons", "dites"], "Avec « ils », dire donne « disent » — le seul en -ent ici."),
    ],
  },
  {
    id: "a1c7", chapter: "A1", title: "Le marché",
    scene: "Marchande : Regardez mes fruits !", sceneGloss: "Look at my fruit!",
    turns: [
      turn("Je ___ (voir) le marché.", "I see the market.", "voir", "je", "vois",
        ["voit", "voyons", "voyez", "voient"], "Avec « je », voir donne « vois » : je vois, tu vois, il voit."),
      turn("Nous ___ (manger) ici.", "We eat here.", "manger", "nous", "mangeons",
        ["mange", "manges", "mangez", "mangent"], "Manger garde son « e » devant « o » : nous mangeons (pas « mangons »)."),
    ],
  },
  {
    id: "a1c8", chapter: "A1", title: "Demain à Paris",
    scene: "Léo : Demain, on visite Paris !", sceneGloss: "Tomorrow, we visit Paris!",
    turns: [
      turn("Je ___ (aller) visiter demain.", "I'm going to visit tomorrow.", "aller", "je", "vais",
        ["vas", "va", "allons", "allez", "vont"], "Futur proche = aller au présent + infinitif : je vais visiter."),
      turn("Hier, j'___ (travailler) ici. [aperçu]", "Yesterday I worked here. [preview]", "travailler", "je", "ai travaillé",
        ["as travaillé", "a travaillé", "avons travaillé", "ont travaillé"],
        "Aperçu du passé composé : auxiliaire avoir + participe « travaillé ». Pas exigé pour la maîtrise A1.", true),
    ],
  },
];

async function main() {
  // Fresh local seed (dev database only).
  await db.execute(sql`TRUNCATE mistakes, progress, cases, curriculum_forms, verbs, profiles RESTART IDENTITY CASCADE`);

  const [profile] = await db.insert(profiles).values({ name: "Apprenti" }).returning();
  console.log("profile:", profile.id, profile.name);

  await db.insert(verbs).values(VERBS.map((v) => ({
    infinitive: v.infinitive, group: v.group, level: "A1", present: v.present,
  })));
  console.log("verbs:", VERBS.length);

  await db.insert(curriculumForms).values(FORMS);
  console.log("forms:", FORMS.length);

  await db.insert(cases).values(CASES.map((c) => ({
    id: c.id, chapter: c.chapter, title: c.title,
    dialogue: { scene: c.scene, sceneGloss: c.sceneGloss, turns: c.turns },
  })));
  console.log("cases:", CASES.length);
  console.log("SEED OK");
}

main().catch((e) => { console.error(e); process.exit(1); });
