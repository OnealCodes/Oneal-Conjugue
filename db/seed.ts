import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "./index";
import { verbs, curriculumForms, cases, profiles } from "./schema";

// Verb bank: infinitive + group + présent forms + Phase 2 stems.
// Présent forms checked against standard conjugations.
const VERBS: {
  infinitive: string;
  group: string;
  level: string;
  present: Record<string, string>;
  auxiliary: string;
  participle: string;
  imparfaitStem: string;
  futurStem: string | null;
}[] = [
  { infinitive: "être", group: "irregular", level: "A1", present: { je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont" }, auxiliary: "avoir", participle: "été", imparfaitStem: "ét", futurStem: "ser" },
  { infinitive: "avoir", group: "irregular", level: "A1", present: { je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont" }, auxiliary: "avoir", participle: "eu", imparfaitStem: "av", futurStem: "aur" },
  { infinitive: "aller", group: "irregular", level: "A1", present: { je: "vais", tu: "vas", il: "va", nous: "allons", vous: "allez", ils: "vont" }, auxiliary: "être", participle: "allé", imparfaitStem: "all", futurStem: "ir" },
  { infinitive: "faire", group: "irregular", level: "A1", present: { je: "fais", tu: "fais", il: "fait", nous: "faisons", vous: "faites", ils: "font" }, auxiliary: "avoir", participle: "fait", imparfaitStem: "fais", futurStem: "fer" },
  { infinitive: "parler", group: "er", level: "A1", present: { je: "parle", tu: "parles", il: "parle", nous: "parlons", vous: "parlez", ils: "parlent" }, auxiliary: "avoir", participle: "parlé", imparfaitStem: "parl", futurStem: null },
  { infinitive: "travailler", group: "er", level: "A1", present: { je: "travaille", tu: "travailles", il: "travaille", nous: "travaillons", vous: "travaillez", ils: "travaillent" }, auxiliary: "avoir", participle: "travaillé", imparfaitStem: "travaill", futurStem: null },
  { infinitive: "chercher", group: "er", level: "A1", present: { je: "cherche", tu: "cherches", il: "cherche", nous: "cherchons", vous: "cherchez", ils: "cherchent" }, auxiliary: "avoir", participle: "cherché", imparfaitStem: "cherch", futurStem: null },
  { infinitive: "jouer", group: "er", level: "A1", present: { je: "joue", tu: "joues", il: "joue", nous: "jouons", vous: "jouez", ils: "jouent" }, auxiliary: "avoir", participle: "joué", imparfaitStem: "jou", futurStem: null },
  { infinitive: "finir", group: "ir", level: "A1", present: { je: "finis", tu: "finis", il: "finit", nous: "finissons", vous: "finissez", ils: "finissent" }, auxiliary: "avoir", participle: "fini", imparfaitStem: "finiss", futurStem: null },
  { infinitive: "partir", group: "ir", level: "A1", present: { je: "pars", tu: "pars", il: "part", nous: "partons", vous: "partez", ils: "partent" }, auxiliary: "être", participle: "parti", imparfaitStem: "part", futurStem: null },
  { infinitive: "vendre", group: "re", level: "A1", present: { je: "vends", tu: "vends", il: "vend", nous: "vendons", vous: "vendez", ils: "vendent" }, auxiliary: "avoir", participle: "vendu", imparfaitStem: "vend", futurStem: null },
  { infinitive: "prendre", group: "irregular", level: "A1", present: { je: "prends", tu: "prends", il: "prend", nous: "prenons", vous: "prenez", ils: "prennent" }, auxiliary: "avoir", participle: "pris", imparfaitStem: "pren", futurStem: "prendr" },
  { infinitive: "venir", group: "irregular", level: "A1", present: { je: "viens", tu: "viens", il: "vient", nous: "venons", vous: "venez", ils: "viennent" }, auxiliary: "être", participle: "venu", imparfaitStem: "ven", futurStem: "viendr" },
  { infinitive: "pouvoir", group: "irregular", level: "A1", present: { je: "peux", tu: "peux", il: "peut", nous: "pouvons", vous: "pouvez", ils: "peuvent" }, auxiliary: "avoir", participle: "pu", imparfaitStem: "pouv", futurStem: "pourr" },
  { infinitive: "vouloir", group: "irregular", level: "A1", present: { je: "veux", tu: "veux", il: "veut", nous: "voulons", vous: "voulez", ils: "veulent" }, auxiliary: "avoir", participle: "voulu", imparfaitStem: "voul", futurStem: "voudr" },
  { infinitive: "devoir", group: "irregular", level: "A1", present: { je: "dois", tu: "dois", il: "doit", nous: "devons", vous: "devez", ils: "doivent" }, auxiliary: "avoir", participle: "dû", imparfaitStem: "dev", futurStem: "devr" },
  { infinitive: "savoir", group: "irregular", level: "A1", present: { je: "sais", tu: "sais", il: "sait", nous: "savons", vous: "savez", ils: "savent" }, auxiliary: "avoir", participle: "su", imparfaitStem: "sav", futurStem: "saur" },
  { infinitive: "dire", group: "irregular", level: "A1", present: { je: "dis", tu: "dis", il: "dit", nous: "disons", vous: "dites", ils: "disent" }, auxiliary: "avoir", participle: "dit", imparfaitStem: "dis", futurStem: "dir" },
  { infinitive: "voir", group: "irregular", level: "A1", present: { je: "vois", tu: "vois", il: "voit", nous: "voyons", vous: "voyez", ils: "voient" }, auxiliary: "avoir", participle: "vu", imparfaitStem: "voy", futurStem: "verr" },
  { infinitive: "mettre", group: "irregular", level: "A1", present: { je: "mets", tu: "mets", il: "met", nous: "mettons", vous: "mettez", ils: "mettent" }, auxiliary: "avoir", participle: "mis", imparfaitStem: "mett", futurStem: "mettr" },
  { infinitive: "manger", group: "spelling", level: "A1", present: { je: "mange", tu: "manges", il: "mange", nous: "mangeons", vous: "mangez", ils: "mangent" }, auxiliary: "avoir", participle: "mangé", imparfaitStem: "mang", futurStem: null },
  { infinitive: "dormir", group: "ir", level: "A2", present: { je: "dors", tu: "dors", il: "dort", nous: "dormons", vous: "dormez", ils: "dorment" }, auxiliary: "avoir", participle: "dormi", imparfaitStem: "dorm", futurStem: null },
  { infinitive: "lire", group: "irregular", level: "A2", present: { je: "lis", tu: "lis", il: "lit", nous: "lisons", vous: "lisez", ils: "lisent" }, auxiliary: "avoir", participle: "lu", imparfaitStem: "lis", futurStem: "lir" },
  { infinitive: "écrire", group: "irregular", level: "A2", present: { je: "écris", tu: "écris", il: "écrit", nous: "écrivons", vous: "écrivez", ils: "écrivent" }, auxiliary: "avoir", participle: "écrit", imparfaitStem: "écriv", futurStem: "écrir" },
  { infinitive: "boire", group: "irregular", level: "A2", present: { je: "bois", tu: "bois", il: "boit", nous: "buvons", vous: "buvez", ils: "boivent" }, auxiliary: "avoir", participle: "bu", imparfaitStem: "buv", futurStem: "boir" },
  { infinitive: "recevoir", group: "irregular", level: "A2", present: { je: "reçois", tu: "reçois", il: "reçoit", nous: "recevons", vous: "recevez", ils: "reçoivent" }, auxiliary: "avoir", participle: "reçu", imparfaitStem: "recev", futurStem: "recevr" },
  { infinitive: "acheter", group: "spelling", level: "A2", present: { je: "achète", tu: "achètes", il: "achète", nous: "achetons", vous: "achetez", ils: "achètent" }, auxiliary: "avoir", participle: "acheté", imparfaitStem: "achet", futurStem: "achèter" },
  { infinitive: "appeler", group: "spelling", level: "A2", present: { je: "appelle", tu: "appelles", il: "appelle", nous: "appelons", vous: "appelez", ils: "appellent" }, auxiliary: "avoir", participle: "appelé", imparfaitStem: "appel", futurStem: "appeller" },
  { infinitive: "préférer", group: "spelling", level: "A2", present: { je: "préfère", tu: "préfères", il: "préfère", nous: "préférons", vous: "préférez", ils: "préfèrent" }, auxiliary: "avoir", participle: "préféré", imparfaitStem: "préfér", futurStem: null },
  { infinitive: "pleuvoir", group: "irregular", level: "A2", present: { il: "pleut" }, auxiliary: "avoir", participle: "plu", imparfaitStem: "pleuv", futurStem: "pleuvr" },
  { infinitive: "entrer", group: "er", level: "A2", present: { je: "entre", tu: "entres", il: "entre", nous: "entrons", vous: "entrez", ils: "entrent" }, auxiliary: "être", participle: "entré", imparfaitStem: "entr", futurStem: null },
  { infinitive: "rentrer", group: "er", level: "A2", present: { je: "rentre", tu: "rentres", il: "rentre", nous: "rentrons", vous: "rentrez", ils: "rentrent" }, auxiliary: "être", participle: "rentré", imparfaitStem: "rentr", futurStem: null },
];

const FORMS = [
  { formId: "present", introducedLevel: "A1", productionLevel: "A1", mode: "production", frequencyTier: "everyday" },
  { formId: "futur_proche", introducedLevel: "A1", productionLevel: "A1", mode: "production", frequencyTier: "everyday" },
  { formId: "passe_compose", introducedLevel: "A1", productionLevel: "A2", mode: "production", frequencyTier: "everyday" },
  { formId: "imparfait", introducedLevel: "A2", productionLevel: "A2", mode: "production", frequencyTier: "everyday" },
  { formId: "futur", introducedLevel: "A2", productionLevel: "A2", mode: "production", frequencyTier: "everyday" },
];

interface Turn {
  prompt: string;
  gloss: string;
  verb: string;
  subject: string;
  answer: string;
  distractors: string[];
  explanation: string;
  formId: string;
  mixed?: boolean;
  preview?: boolean;
}

function turn(prompt: string, gloss: string, verb: string, subject: string, answer: string, distractors: string[], explanation: string, formId: string, extra?: { mixed?: boolean; preview?: boolean }): Turn {
  return { prompt, gloss, verb, subject, answer, distractors, explanation, formId, ...extra };
}

const P = (formId: string) => formId;

const CASES: { id: string; chapter: string; title: string; scene: string; sceneGloss: string; turns: Turn[] }[] = [
  {
    id: "a1c1", chapter: "A1", title: "Bienvenue sur la place",
    scene: "Marchand : Bonjour ! Vous êtes nouveau ici ?", sceneGloss: "Hello! Are you new here?",
    turns: [
      turn("Oui, je ___ (être) nouveau.", "Yes, I am new.", "être", "je", "suis",
        ["es", "est", "sommes", "êtes", "sont"], "Avec « je », être au présent donne « suis » : je suis, tu es, il est.", P("present")),
      turn("Tu ___ (avoir) raison ?", "Are you right?", "avoir", "tu", "as",
        ["ai", "a", "avons", "avez", "ont"], "Avec « tu », avoir au présent donne « as » : j'ai, tu as, il a.", P("present")),
    ],
  },
  {
    id: "a1c2", chapter: "A1", title: "Le marchand",
    scene: "Marchand : Qu'est-ce que vous cherchez ?", sceneGloss: "What are you looking for?",
    turns: [
      turn("Je ___ (aller) à la gare.", "I'm going to the station.", "aller", "je", "vais",
        ["vas", "va", "allons", "allez", "vont"], "Avec « je », aller au présent donne « vais » : je vais, tu vas, il va.", P("present")),
      turn("Vous ___ (parler) français ?", "Do you speak French?", "parler", "vous", "parlez",
        ["parle", "parles", "parlons", "parlent"], "Avec « vous », les verbes en -er prennent « -ez » : vous parlez.", P("present")),
    ],
  },
  {
    id: "a1c3", chapter: "A1", title: "La boulangerie",
    scene: "Boulangère : Bonjour ! Je peux vous aider ?", sceneGloss: "Hello! Can I help you?",
    turns: [
      turn("Je ___ (faire) les courses.", "I'm doing the shopping.", "faire", "je", "fais",
        ["fait", "faisons", "faites", "font"], "Avec « je », faire au présent donne « fais » : je fais, tu fais, il fait.", P("present")),
      turn("Nous ___ (prendre) deux baguettes.", "We'll take two baguettes.", "prendre", "nous", "prenons",
        ["prends", "prend", "prenez", "prennent"], "Avec « nous », prendre donne « prenons » : je prends, nous prenons.", P("present")),
    ],
  },
  {
    id: "a1c4", chapter: "A1", title: "Le retour",
    scene: "Léo : Il est tard. On rentre ?", sceneGloss: "It's late. Shall we go home?",
    turns: [
      turn("Tu ___ (venir) avec moi ?", "Are you coming with me?", "venir", "tu", "viens",
        ["vient", "venons", "venez", "viennent"], "Avec « tu », venir donne « viens » : je viens, tu viens, il vient.", P("present")),
      turn("Je ___ (pouvoir) aider.", "I can help.", "pouvoir", "je", "peux",
        ["peut", "pouvons", "pouvez", "peuvent"], "Avec « je », pouvoir donne « peux » : je peux, tu peux, il peut.", P("present")),
    ],
  },
  {
    id: "a1c5", chapter: "A1", title: "Le café",
    scene: "Serveuse : Vous désirez ?", sceneGloss: "What would you like?",
    turns: [
      turn("Je ___ (vouloir) un café.", "I'd like a coffee.", "vouloir", "je", "veux",
        ["veut", "voulons", "voulez", "veulent"], "Avec « je », vouloir donne « veux » : je veux, tu veux, il veut.", P("present")),
      turn("Nous ___ (devoir) partir.", "We must leave.", "devoir", "nous", "devons",
        ["dois", "doit", "devez", "doivent"], "Avec « nous », devoir donne « devons » : je dois, nous devons.", P("present")),
    ],
  },
  {
    id: "a1c6", chapter: "A1", title: "Les amis",
    scene: "Amie : Tu connais la réponse ?", sceneGloss: "Do you know the answer?",
    turns: [
      turn("Tu ___ (savoir) la réponse ?", "Do you know the answer?", "savoir", "tu", "sais",
        ["sait", "savons", "savez", "savent"], "Avec « tu », savoir donne « sais » : je sais, tu sais, il sait.", P("present")),
      turn("Ils ___ (dire) bonjour.", "They say hello.", "dire", "ils", "disent",
        ["dis", "dit", "disons", "dites"], "Avec « ils », dire donne « disent » — le seul en -ent ici.", P("present")),
    ],
  },
  {
    id: "a1c7", chapter: "A1", title: "Le marché",
    scene: "Marchande : Regardez mes fruits !", sceneGloss: "Look at my fruit!",
    turns: [
      turn("Je ___ (voir) le marché.", "I see the market.", "voir", "je", "vois",
        ["voit", "voyons", "voyez", "voient"], "Avec « je », voir donne « vois » : je vois, tu vois, il voit.", P("present")),
      turn("Nous ___ (manger) ici.", "We eat here.", "manger", "nous", "mangeons",
        ["mange", "manges", "mangez", "mangent"], "Manger garde son « e » devant « o » : nous mangeons (pas « mangons »).", P("present")),
    ],
  },
  {
    id: "a1c8", chapter: "A1", title: "Demain à Paris",
    scene: "Léo : Demain, on visite Paris !", sceneGloss: "Tomorrow, we visit Paris!",
    turns: [
      turn("Je ___ (aller) visiter demain.", "I'm going to visit tomorrow.", "aller", "je", "vais",
        ["vas", "va", "allons", "allez", "vont"], "Futur proche = aller au présent + infinitif : je vais visiter.", P("present")),
      turn("Hier, j'___ (travailler) ici. [aperçu]", "Yesterday I worked here. [preview]", "travailler", "je", "ai travaillé",
        ["as travaillé", "a travaillé", "avons travaillé", "ont travaillé"],
        "Aperçu du passé composé : auxiliaire avoir + participe « travaillé ». Pas exigé pour la maîtrise A1.", P("passe_compose"), { preview: true }),
    ],
  },
  {
    id: "a2c1", chapter: "A2", title: "Hier soir",
    scene: "Témoin : Racontez-moi votre soirée.", sceneGloss: "Tell me about your evening.",
    turns: [
      turn("Hier, j'___ (manger) au restaurant.", "Yesterday I ate at the restaurant.", "manger", "je", "ai mangé",
        ["as mangé", "a mangé", "avons mangé", "ont mangé"], "« Hier » = action terminée → passé composé : auxiliaire + « mangé ».", P("passe_compose")),
      turn("Tu ___ (finir) tes devoirs ?", "Did you finish your homework?", "finir", "tu", "as fini",
        ["ai fini", "a fini", "avons fini", "ont fini"], "Passé composé avec avoir : l'auxiliaire s'accorde avec le sujet (tu → as).", P("passe_compose")),
    ],
  },
  {
    id: "a2c2", chapter: "A2", title: "À la gare",
    scene: "Contrôleur : Vos billets, s'il vous plaît.", sceneGloss: "Tickets, please.",
    turns: [
      turn("Elle ___ (aller) à Paris.", "She went to Paris.", "aller", "il", "est allée",
        ["a allé", "est allé", "sont allées", "sommes allés"], "Aller prend l'auxiliaire être ; avec « elle », on accorde : est allée.", P("passe_compose")),
      turn("Nous ___ (venir) hier.", "We came yesterday.", "venir", "nous", "sommes venus",
        ["avons venu", "sommes venu", "est venus", "sont venus"], "Venir prend être ; avec « nous » (masc.), on accorde : sommes venus.", P("passe_compose")),
    ],
  },
  {
    id: "a2c3", chapter: "A2", title: "Souvenirs",
    scene: "Grand-mère : Quand j'étais petite…", sceneGloss: "When I was little…",
    turns: [
      turn("Quand j'étais petit, je ___ (jouer) dehors.", "When I was little, I played outside.", "jouer", "je", "jouais",
        ["joue", "jouerai", "ai joué", "jouait"], "Une habitude du passé → imparfait : je jouais (pas de passé composé ici).", P("imparfait")),
      turn("Nous ___ (avoir) un chien.", "We had a dog.", "avoir", "nous", "avions",
        ["avons", "avons eu", "aurons", "aviez"], "Un état durable du passé → imparfait : nous avions.", P("imparfait")),
    ],
  },
  {
    id: "a2c4", chapter: "A2", title: "Demain",
    scene: "Léo : Préparons la journée de demain !", sceneGloss: "Let's plan tomorrow!",
    turns: [
      turn("Demain, je ___ (prendre) le train.", "Tomorrow I'll take the train.", "prendre", "je", "prendrai",
        ["prends", "prenais", "ai pris", "prenne"], "« Demain » → futur simple : je prendrai (radical prendr-).", P("futur")),
      turn("Vous ___ (voir) Paris.", "You will see Paris.", "voir", "vous", "verrez",
        ["voyez", "verra", "voyaient", "ai vu"], "Futur de voir : vous verrez — avec deux r.", P("futur")),
    ],
  },
  {
    id: "a2c5", chapter: "A2", title: "Quel temps ? (mélangé)",
    scene: "Léo : Attention, le temps n'est pas annoncé !", sceneGloss: "Careful — the tense is not announced!",
    turns: [
      turn("Quand j'étais petit, je ___ (aller) souvent au parc.", "When I was little, I often went to the park.", "aller", "je", "allais",
        ["vais", "suis allé", "irai", "aille"], "« Quand j'étais petit » = habitude → imparfait : j'allais.", P("imparfait"), { mixed: true }),
      turn("Hier, nous ___ (voir) un film.", "Yesterday we saw a film.", "voir", "nous", "avons vu",
        ["voyons", "voyions", "verrons", "voyaient"], "« Hier » = terminé → passé composé : nous avons vu.", P("passe_compose"), { mixed: true }),
      turn("Demain, tu ___ (venir) ?", "Will you come tomorrow?", "venir", "tu", "viendras",
        ["viens", "venais", "es venu", "viendrais"], "« Demain » → futur : tu viendras.", P("futur"), { mixed: true }),
    ],
  },
  {
    id: "a2c6", chapter: "A2", title: "La nuit du vol (mélangé)",
    scene: "Inspecteur : Que s'est-il passé cette nuit-là ?", sceneGloss: "What happened that night?",
    turns: [
      turn("Quand le voleur ___ (entrer), le gardien dormait.", "When the thief entered, the guard was sleeping.", "entrer", "il", "est entré",
        ["entrait", "a entré", "entre", "entrerait"], "L'entrée = événement unique → passé composé avec être : il est entré.", P("passe_compose"), { mixed: true }),
      turn("Quand le voleur est entré, le gardien ___ (dormir).", "…the guard was sleeping.", "dormir", "il", "dormait",
        ["a dormi", "dort", "dormira", "dorme"], "Le gardien dormait déjà = décor en cours → imparfait : il dormait.", P("imparfait"), { mixed: true }),
      turn("Il ___ (pleuvoir) très fort.", "It was raining hard.", "pleuvoir", "il", "pleuvait",
        ["a plu", "pleut", "pleuvra", "pleuve"], "La météo en fond → imparfait : il pleuvait.", P("imparfait"), { mixed: true }),
    ],
  },
  {
    id: "sim1", chapter: "SIM", title: "Reconstituer la soirée (simulation)",
    scene: "Inspecteur : Reconstituons la soirée, minute par minute.", sceneGloss: "Let's reconstruct the evening, minute by minute.",
    turns: [
      turn("Hier soir, je ___ (rentrer) à 22 heures.", "Last night I got home at 10pm.", "rentrer", "je", "suis rentrée",
        ["suis rentré", "ai rentré", "es rentrée", "est rentrée"], "Témoin féminin + rentrer (être) : je suis rentrée.", P("passe_compose"), { mixed: true }),
      turn("Il ___ (pleuvoir) très fort.", "It was raining hard.", "pleuvoir", "il", "pleuvait",
        ["a plu", "pleut", "pleuvra", "pleuve"], "La météo en fond → imparfait : il pleuvait.", P("imparfait"), { mixed: true }),
      turn("La rue ___ (être) vide.", "The street was empty.", "être", "il", "était",
        ["a été", "est", "sera", "soit"], "Décor du récit → imparfait : la rue était vide.", P("imparfait"), { mixed: true }),
    ],
  },
];

async function main() {
  // Fresh local seed (dev database only).
  await db.execute(sql`TRUNCATE mistakes, progress, cases, curriculum_forms, verbs, profiles RESTART IDENTITY CASCADE`);

  const [profile] = await db.insert(profiles).values({ name: "Apprenti" }).returning();
  console.log("profile:", profile.id, profile.name);

  await db.insert(verbs).values(VERBS.map((v) => ({
    infinitive: v.infinitive, group: v.group, level: v.level, present: v.present,
    auxiliary: v.auxiliary, participle: v.participle,
    imparfaitStem: v.imparfaitStem, futurStem: v.futurStem,
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
