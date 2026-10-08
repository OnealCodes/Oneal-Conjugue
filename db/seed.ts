import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "./index";
import { verbs, curriculumForms, cases, profiles } from "./schema";

// Verb bank: infinitive + group + présent forms + Phase 2 stems.
// Présent forms checked against standard conjugations.
interface SeedVerb {
  infinitive: string;
  group: string;
  level: string;
  present: Record<string, string>;
  auxiliary: string;
  participle: string;
  imparfaitStem: string;
  futurStem: string | null;
}
const VERBS: SeedVerb[] = [
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

// Subjonctif présent forms (too irregular for rules — stored explicitly).
const SUBJ: Record<string, Record<string, string>> = {
  "être": { je: "sois", tu: "sois", il: "soit", nous: "soyons", vous: "soyez", ils: "soient" },
  "avoir": { je: "aie", tu: "aies", il: "ait", nous: "ayons", vous: "ayez", ils: "aient" },
  "aller": { je: "aille", tu: "ailles", il: "aille", nous: "allions", vous: "alliez", ils: "aillent" },
  "faire": { je: "fasse", tu: "fasses", il: "fasse", nous: "fassions", vous: "fassiez", ils: "fassent" },
  "parler": { je: "parle", tu: "parles", il: "parle", nous: "parlions", vous: "parliez", ils: "parlent" },
  "travailler": { je: "travaille", tu: "travailles", il: "travaille", nous: "travaillions", vous: "travailliez", ils: "travaillent" },
  "chercher": { je: "cherche", tu: "cherches", il: "cherche", nous: "cherchions", vous: "cherchiez", ils: "cherchent" },
  "jouer": { je: "joue", tu: "joues", il: "joue", nous: "jouions", vous: "jouiez", ils: "jouent" },
  "finir": { je: "finisse", tu: "finisses", il: "finisse", nous: "finissions", vous: "finissiez", ils: "finissent" },
  "partir": { je: "parte", tu: "partes", il: "parte", nous: "partions", vous: "partiez", ils: "partent" },
  "vendre": { je: "vende", tu: "vendes", il: "vende", nous: "vendions", vous: "vendiez", ils: "vendent" },
  "prendre": { je: "prenne", tu: "prennes", il: "prenne", nous: "prenions", vous: "preniez", ils: "prennent" },
  "venir": { je: "vienne", tu: "viennes", il: "vienne", nous: "venions", vous: "veniez", ils: "viennent" },
  "pouvoir": { je: "puisse", tu: "puisses", il: "puisse", nous: "puissions", vous: "puissiez", ils: "puissent" },
  "vouloir": { je: "veuille", tu: "veuilles", il: "veuille", nous: "voulions", vous: "vouliez", ils: "veuillent" },
  "devoir": { je: "doive", tu: "doives", il: "doive", nous: "devions", vous: "deviez", ils: "doivent" },
  "savoir": { je: "sache", tu: "saches", il: "sache", nous: "sachions", vous: "sachiez", ils: "sachent" },
  "dire": { je: "dise", tu: "dises", il: "dise", nous: "disions", vous: "disiez", ils: "disent" },
  "voir": { je: "voie", tu: "voies", il: "voie", nous: "voyions", vous: "voyiez", ils: "voient" },
  "mettre": { je: "mette", tu: "mettes", il: "mette", nous: "mettions", vous: "mettiez", ils: "mettent" },
  "manger": { je: "mange", tu: "manges", il: "mange", nous: "mangions", vous: "mangiez", ils: "mangent" },
  "dormir": { je: "dorme", tu: "dormes", il: "dorme", nous: "dormions", vous: "dormiez", ils: "dorment" },
  "lire": { je: "lise", tu: "lises", il: "lise", nous: "lisions", vous: "lisiez", ils: "lisent" },
  "écrire": { je: "écrive", tu: "écrives", il: "écrive", nous: "écrivions", vous: "écriviez", ils: "écrivent" },
  "boire": { je: "boive", tu: "boives", il: "boive", nous: "buvions", vous: "buviez", ils: "boivent" },
  "recevoir": { je: "reçoive", tu: "reçoives", il: "reçoive", nous: "recevions", vous: "receviez", ils: "reçoivent" },
  "acheter": { je: "achète", tu: "achètes", il: "achète", nous: "achetions", vous: "achetiez", ils: "achètent" },
  "appeler": { je: "appelle", tu: "appelles", il: "appelle", nous: "appelions", vous: "appeliez", ils: "appellent" },
  "préférer": { je: "préfère", tu: "préfères", il: "préfère", nous: "préférions", vous: "préfériez", ils: "préfèrent" },
  "pleuvoir": { il: "pleuve" },
  "entrer": { je: "entre", tu: "entres", il: "entre", nous: "entrions", vous: "entriez", ils: "entrent" },
  "rentrer": { je: "rentre", tu: "rentres", il: "rentre", nous: "rentrions", vous: "rentriez", ils: "rentrent" },
  "falloir": { il: "faille" },
  "se lever": { je: "me lève", tu: "te lèves", il: "se lève", nous: "nous levons", vous: "vous levez", ils: "se lèvent" },
  "rire": { je: "rie", tu: "ries", il: "rie", nous: "riions", vous: "riiez", ils: "rient" },
  "croire": { je: "croie", tu: "croies", il: "croie", nous: "croyions", vous: "croyiez", ils: "croient" },
};

const NEW_VERBS: SeedVerb[] = [
  { infinitive: "falloir", group: "irregular", level: "B1", present: { il: "faut" }, auxiliary: "avoir", participle: "fallu", imparfaitStem: "fall", futurStem: "faudr" },
  { infinitive: "se lever", group: "pronominal", level: "B1", present: { je: "me lève", tu: "te lèves", il: "se lève", nous: "nous levons", vous: "vous levez", ils: "se lèvent" }, auxiliary: "être", participle: "levé", imparfaitStem: "lev", futurStem: null },
  { infinitive: "rire", group: "irregular", level: "B1", present: { je: "ris", tu: "ris", il: "rit", nous: "rions", vous: "riez", ils: "rient" }, auxiliary: "avoir", participle: "ri", imparfaitStem: "ri", futurStem: "rir" },
  { infinitive: "croire", group: "irregular", level: "B1", present: { je: "crois", tu: "crois", il: "croit", nous: "croyons", vous: "croyez", ils: "croient" }, auxiliary: "avoir", participle: "cru", imparfaitStem: "croy", futurStem: "croir" },
];

VERBS.push(...NEW_VERBS);

const FORMS = [
  { formId: "present", introducedLevel: "A1", productionLevel: "A1", mode: "production", frequencyTier: "everyday" },
  { formId: "futur_proche", introducedLevel: "A1", productionLevel: "A1", mode: "production", frequencyTier: "everyday" },
  { formId: "passe_compose", introducedLevel: "A1", productionLevel: "A2", mode: "production", frequencyTier: "everyday" },
  { formId: "imparfait", introducedLevel: "A2", productionLevel: "A2", mode: "production", frequencyTier: "everyday" },
  { formId: "futur", introducedLevel: "A2", productionLevel: "A2", mode: "production", frequencyTier: "everyday" },
  { formId: "subjonctif", introducedLevel: "B1", productionLevel: "B2", mode: "production", frequencyTier: "everyday" },
  { formId: "conditionnel_present", introducedLevel: "B1", productionLevel: "B1", mode: "production", frequencyTier: "everyday" },
  { formId: "plus_que_parfait", introducedLevel: "B1", productionLevel: "B2", mode: "production", frequencyTier: "everyday" },
  { formId: "conditionnel_passe", introducedLevel: "B2", productionLevel: "B2", mode: "production", frequencyTier: "everyday" },
  { formId: "futur_anterieur", introducedLevel: "B2", productionLevel: "B2", mode: "production", frequencyTier: "written" },
  { formId: "subjonctif_passe", introducedLevel: "C1", productionLevel: "C1", mode: "production", frequencyTier: "formal" },
  { formId: "passe_simple", introducedLevel: "B2", productionLevel: "C1", mode: "recognition_only", frequencyTier: "literary" },
  { formId: "imparfait_subjonctif", introducedLevel: "C2", productionLevel: "C2", mode: "recognition_only", frequencyTier: "literary" },
  { formId: "passe_anterieur", introducedLevel: "C1", productionLevel: "C1", mode: "recognition_only", frequencyTier: "literary" },
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
  recognition?: boolean;
}

function turn(prompt: string, gloss: string, verb: string, subject: string, answer: string, distractors: string[], explanation: string, formId: string, extra?: { mixed?: boolean; preview?: boolean; recognition?: boolean }): Turn {
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
  {
    id: "b1c1", chapter: "B1", title: "Il faut que…",
    scene: "Professeure : Pour réussir, il y a des règles.", sceneGloss: "To succeed, there are rules.",
    turns: [
      turn("Il faut que tu ___ (venir).", "You must come.", "venir", "tu", "viennes",
        ["viens", "viendras", "es venu", "viendrais"], "Après « il faut que » → subjonctif : que tu viennes.", P("subjonctif")),
      turn("Je veux que vous ___ (faire) attention.", "I want you to be careful.", "faire", "vous", "fassiez",
        ["faites", "ferez", "avez fait", "fassent"], "Après « vouloir que » → subjonctif : que vous fassiez.", P("subjonctif")),
    ],
  },
  {
    id: "b1c2", chapter: "B1", title: "Si j'avais…",
    scene: "Léo : Et si tout était possible ?", sceneGloss: "What if everything were possible?",
    turns: [
      turn("Si j'avais le temps, je ___ (partir).", "If I had time, I'd leave.", "partir", "je", "partirais",
        ["partirai", "partais", "suis parti", "parte"], "Si + imparfait → conditionnel : je partirais.", P("conditionnel_present")),
      turn("___-vous m'aider, s'il vous plaît ? (pouvoir)", "Could you help me, please?", "pouvoir", "vous", "pourriez",
        ["pouvez", "pourrez", "avez pu", "puissiez"], "Politesse → conditionnel : Pourriez-vous… (pas « Pouvez » ici).", P("conditionnel_present")),
    ],
  },
  {
    id: "b1c3", chapter: "B1", title: "Avant…",
    scene: "Témoin : Laissez-moi remettre les événements en ordre.", sceneGloss: "Let me put events in order.",
    turns: [
      turn("Quand je suis arrivé, ils ___ (partir) déjà.", "When I arrived, they'd already left.", "partir", "ils", "étaient partis",
        ["sont partis", "partaient", "partiront", "partent"], "Action avant une autre action passée → plus-que-parfait.", P("plus_que_parfait")),
      turn("Elle ___ (lire) ce livre avant.", "She had read this book before.", "lire", "il", "avait lu",
        ["a lu", "lisait", "lira", "lise"], "Antériorité dans le passé : auxiliaire à l'imparfait + participe.", P("plus_que_parfait")),
    ],
  },
  {
    id: "b1c4", chapter: "B1", title: "Le matin",
    scene: "Réveil : Debout, apprenti !", sceneGloss: "Up, apprentice!",
    turns: [
      turn("Je ___ (se lever) à 7 heures.", "I get up at 7.", "se lever", "je", "me lève",
        ["me lèves", "se lève", "nous levons", "lever"], "Verbe pronominal : le pronom réfléchi s'accorde (je → me).", P("present")),
      turn("Levez-___ ! (se lever, impératif)", "Get up!", "se lever", "vous", "vous",
        ["te", "nous", "les", "se"], "Impératif + pronom : Levez-vous ! (pronom après, trait d'union).", P("present")),
    ],
  },
  {
    id: "b2c1", chapter: "B2", title: "Doutes et regrets",
    scene: "Avocate : Chaque mot compte.", sceneGloss: "Every word counts.",
    turns: [
      turn("Il est possible qu'elle ___ (venir).", "She may come.", "venir", "il", "vienne",
        ["vient", "viendra", "est venue", "viendrait"], "« Il est possible que » (doute) → subjonctif : qu'elle vienne.", P("subjonctif")),
      turn("À ta place, je ___ (prendre) le train.", "In your shoes, I'd take the train.", "prendre", "je", "prendrais",
        ["prendrai", "prenais", "ai pris", "prenne"], "Conseil hypothétique → conditionnel : je prendrais.", P("conditionnel_present")),
      turn("Si j'avais su, je ___ (venir) plus tôt.", "Had I known, I'd have come earlier.", "venir", "je", "serais venu",
        ["viendrais", "suis venu", "venais", "venir"], "Si + plus-que-parfait → conditionnel passé : je serais venu.", P("conditionnel_passe")),
    ],
  },
  {
    id: "b2c2", chapter: "B2", title: "Le rapport (mélangé)",
    scene: "Directrice : Le rapport doit être prêt.", sceneGloss: "The report must be ready.",
    turns: [
      turn("Quand tu arriveras, j'___ (finir) le rapport.", "When you arrive, I'll have finished the report.", "finir", "je", "aurai fini",
        ["ai fini", "finirai", "finisse", "finissais"], "Action future avant une autre → futur antérieur : j'aurai fini.", P("futur_anterieur")),
      turn("Il faut qu'il ___ (être) là avant midi.", "He must be there before noon.", "être", "il", "soit",
        ["est", "sera", "a été", "était"], "« Il faut que » → subjonctif, même au B2 : qu'il soit.", P("subjonctif"), { mixed: true }),
      turn("Hier, elle ___ (recevoir) ma lettre.", "Yesterday she received my letter.", "recevoir", "il", "a reçu",
        ["recevait", "recevra", "reçoive", "reçoit"], "« Hier » → passé composé : elle a reçu.", P("passe_compose"), { mixed: true }),
    ],
  },
  {
    id: "c1c1", chapter: "C1", title: "Le procès",
    scene: "Juge : La cour écoute les témoins.", sceneGloss: "The court hears the witnesses.",
    turns: [
      turn("Bien qu'il ___ (finir) son travail…", "Although he finished his work…", "finir", "il", "ait fini",
        ["a fini", "finisse", "finira", "finissait"], "« Bien que » + accompli → subjonctif passé : qu'il ait fini.", P("subjonctif_passe")),
      turn("Il est possible qu'elle ___ (partir) déjà.", "She may already have left.", "partir", "il", "soit partie",
        ["est partie", "parte", "partira", "partait"], "Doute + antériorité, sujet féminin → qu'elle soit partie.", P("subjonctif_passe")),
    ],
  },
  {
    id: "c1c2", chapter: "C1", title: "Courrier formel",
    scene: "Cabinet : Veuillez lire attentivement.", sceneGloss: "Please read carefully.",
    turns: [
      turn("Dès que vous ___ (recevoir) ce courrier, appelez-moi.", "As soon as you receive this letter, call me.", "recevoir", "vous", "aurez reçu",
        ["avez reçu", "recevrez", "receviez", "ayez reçu"], "« Dès que » + futur, registre soutenu → futur antérieur : vous aurez reçu.", P("futur_anterieur")),
      turn("Nous vous ___ (savoir) gré de votre réponse.", "We thank you for your reply.", "savoir", "nous", "saurons",
        ["savons", "saurions", "avons su", "sachions"], "Formule formelle « savoir gré » : nous vous saurons gré.", P("futur")),
    ],
  },
  {
    id: "c1c3", chapter: "C1", title: "Le roman (lecture)",
    scene: "Bibliothécaire : Chut… on lit.", sceneGloss: "Shh… we read.",
    turns: [
      turn("« Il ouvrit la porte et s'avança. » — Quel temps ?", "Which tense?", "ouvrir", "il", "passé simple",
        ["imparfait", "passé composé", "futur"], "Passé simple littéraire : il ouvrit (temps du récit écrit).", P("passe_simple"), { recognition: true }),
      turn("« Il fallait qu'il partît. » — Quel temps ?", "Which tense?", "partir", "il", "imparfait du subjonctif",
        ["subjonctif présent", "plus-que-parfait", "conditionnel"], "Imparfait du subjonctif littéraire : qu'il partît.", P("imparfait_subjonctif"), { recognition: true }),
    ],
  },
  {
    id: "c2c1", chapter: "C2", title: "La bibliothèque (mélangé)",
    scene: "Conservateur : Ici, chaque livre a son temps.", sceneGloss: "Here, every book has its tense.",
    turns: [
      turn("« Dès qu'il eut terminé, il sortit. » — Quel temps pour « eut terminé » ?", "Which tense?", "finir", "il", "passé antérieur",
        ["plus-que-parfait", "passé simple", "passé composé"], "Passé antérieur littéraire : action avant un passé simple.", P("passe_anterieur"), { recognition: true }),
      turn("Bien qu'elle ___ (finir) son travail, elle reste.", "Although she's finished her work, she's staying.", "finir", "il", "ait fini",
        ["a fini", "finisse", "finira", "finissait"], "Concession accomplie → subjonctif passé : bien qu'elle ait fini.", P("subjonctif_passe"), { mixed: true }),
      turn("Quoiqu'il ___ (pleuvoir), ils partirent.", "Although it was raining, they left.", "pleuvoir", "il", "pleuve",
        ["pleut", "pleuvra", "a plu", "pleuvait"], "« Quoique » (soutenu) → subjonctif : qu'il pleuve.", P("subjonctif"), { mixed: true }),
    ],
  },
  {
    id: "c2c2", chapter: "C2", title: "Grand débat",
    scene: "Modératrice : À vous de juger.", sceneGloss: "Up to you to judge.",
    turns: [
      turn("Je doute qu'il ___ (dire) la vérité.", "I doubt he's telling the truth.", "dire", "il", "dise",
        ["dit", "dira", "a dit", "disait"], "Doute → subjonctif : qu'il dise.", P("subjonctif")),
      turn("Il est évident qu'elle ___ (savoir).", "She obviously knows.", "savoir", "il", "sait",
        ["sache", "saura", "a su", "savait"], "« Il est évident que » affirmatif → indicatif : elle sait.", P("present")),
      turn("Partez sans que je ___ (venir).", "Leave without me coming.", "venir", "je", "vienne",
        ["viens", "viendrai", "suis venu", "venais"], "« Sans que » → toujours le subjonctif : sans que je vienne.", P("subjonctif")),
    ],
  },
  {
    id: "sim2", chapter: "SIM", title: "Le Tribunal (simulation)",
    scene: "Huissier : La cour entre en séance.", sceneGloss: "The court is in session.",
    turns: [
      turn("Bien qu'il ___ (dire) la vérité…", "Although he told the truth…", "dire", "il", "ait dit",
        ["a dit", "dise", "dira", "disait"], "Concession accomplie → subjonctif passé : bien qu'il ait dit.", P("subjonctif_passe"), { mixed: true }),
      turn("Le tribunal ordonne qu'elle ___ (venir) demain.", "The court orders her to come tomorrow.", "venir", "il", "vienne",
        ["vient", "viendra", "est venue", "viendrait"], "Ordre → subjonctif : qu'elle vienne.", P("subjonctif"), { mixed: true }),
      turn("Il a déclaré qu'il ___ (être) innocent.", "He declared he was innocent.", "être", "il", "était",
        ["est", "sera", "a été", "soit"], "Discours rapporté au passé → concordance : qu'il était innocent.", P("imparfait"), { mixed: true }),
    ],
  },
];

async function main() {
  // Fresh local seed (dev database only).
  await db.execute(sql`TRUNCATE attempts, mistakes, progress, cases, curriculum_forms, verbs, profiles RESTART IDENTITY CASCADE`);

  const [profile] = await db.insert(profiles).values({ name: "Apprenti" }).returning();
  console.log("profile:", profile.id, profile.name);

  await db.insert(verbs).values(VERBS.map((v) => ({
    infinitive: v.infinitive, group: v.group, level: v.level, present: v.present,
    auxiliary: v.auxiliary, participle: v.participle,
    imparfaitStem: v.imparfaitStem, futurStem: v.futurStem,
    subjonctif: SUBJ[v.infinitive] ?? null,
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
