// Phase 2 conjugation helpers (regular rules + stored irregular stems).
// Simplification: agreement defaults to masculine singular except where the
// exercise states otherwise. Full agreement engine arrives in a later phase.

export const IMPARFAIT_ENDINGS: Record<string, string> = {
  je: "ais",
  tu: "ais",
  il: "ait",
  nous: "ions",
  vous: "iez",
  ils: "aient",
};

export const FUTUR_ENDINGS: Record<string, string> = {
  je: "ai",
  tu: "as",
  il: "a",
  nous: "ons",
  vous: "ez",
  ils: "ont",
};

export interface VerbRow {
  infinitive: string;
  auxiliary: string;
  participle: string | null;
  imparfaitStem: string | null;
  futurStem: string | null;
  present: Record<string, string>;
}

export function passeCompose(verb: VerbRow, subject: string, feminine = false): string {
  const aux = verb.auxiliary === "être" ? { je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont" }[subject] : { je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont" }[subject];
  return `${aux} ${agree(verb.participle ?? "", verb.auxiliary, subject, feminine)}`.trim();
}

export function imparfait(verb: VerbRow, subject: string): string {
  return `${verb.imparfaitStem ?? verb.infinitive}${IMPARFAIT_ENDINGS[subject]}`;
}

export function futur(verb: VerbRow, subject: string): string {
  const stem = verb.futurStem ?? verb.infinitive;
  return `${stem}${FUTUR_ENDINGS[subject]}`;
}

export interface VerbRowB1 extends VerbRow {
  subjonctif: Record<string, string> | null;
}

// Phase 3: subjonctif présent comes from stored forms (too irregular for rules).
export function subjonctif(verb: VerbRowB1, subject: string): string {
  return verb.subjonctif?.[subject] ?? "";
}

// Phase 4: subjonctif passé = auxiliaire au subjonctif + participe.
export function subjonctifPasse(verb: VerbRowB1, subject: string): string {
  const auxSubj: Record<string, Record<string, string>> = {
    être: { je: "sois", tu: "sois", il: "soit", nous: "soyons", vous: "soyez", ils: "soient" },
    avoir: { je: "aie", tu: "aies", il: "ait", nous: "ayons", vous: "ayez", ils: "aient" },
  };
  const auxForms = auxSubj[verb.auxiliary] ?? auxSubj.avoir;
  return `${auxForms[subject] ?? ""} ${verb.participle ?? ""}`.trim();
}

// Conditionnel présent = futur stem + imparfait endings.
export function conditionnel(verb: VerbRow, subject: string): string {
  const stem = verb.futurStem ?? verb.infinitive;
  return `${stem}${IMPARFAIT_ENDINGS[subject]}`;
}

function auxPresent(aux: string, subject: string): string {
  const m: Record<string, Record<string, string>> = {
    être: { je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont" },
    avoir: { je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont" },
  };
  return (m[aux] ?? m.avoir)[subject] ?? "";
}

function auxImparfait(aux: string, subject: string): string {
  const m: Record<string, Record<string, string>> = {
    être: { je: "étais", tu: "étais", il: "était", nous: "étions", vous: "étiez", ils: "étaient" },
    avoir: { je: "avais", tu: "avais", il: "avait", nous: "avions", vous: "aviez", ils: "avaient" },
  };
  return (m[aux] ?? m.avoir)[subject] ?? "";
}

function auxFutur(aux: string, subject: string): string {
  const m: Record<string, Record<string, string>> = {
    être: { je: "serai", tu: "seras", il: "sera", nous: "serons", vous: "serez", ils: "seront" },
    avoir: { je: "aurai", tu: "auras", il: "aura", nous: "aurons", vous: "aurez", ils: "auront" },
  };
  return (m[aux] ?? m.avoir)[subject] ?? "";
}

function auxConditionnel(aux: string, subject: string): string {
  const m: Record<string, Record<string, string>> = {
    être: { je: "serais", tu: "serais", il: "serait", nous: "serions", vous: "seriez", ils: "seraient" },
    avoir: { je: "aurais", tu: "aurais", il: "aurait", nous: "aurions", vous: "auriez", ils: "auraient" },
  };
  return (m[aux] ?? m.avoir)[subject] ?? "";
}

// Agreement for compound tenses with être (masculine default; feminine +e).
function agree(part: string, aux: string, subject: string, feminine = false): string {
  if (aux !== "être") return part;
  if (feminine) part += "e";
  if (subject === "nous" || subject === "vous" || subject === "ils") part += "s";
  return part;
}

// Plus-que-parfait = auxiliaire à l'imparfait + participe.
export function plusQueParfait(verb: VerbRow, subject: string, feminine = false): string {
  return `${auxImparfait(verb.auxiliary, subject)} ${agree(verb.participle ?? "", verb.auxiliary, subject, feminine)}`.trim();
}

// Futur antérieur = auxiliaire au futur + participe.
export function futurAnterieur(verb: VerbRow, subject: string, feminine = false): string {
  return `${auxFutur(verb.auxiliary, subject)} ${agree(verb.participle ?? "", verb.auxiliary, subject, feminine)}`.trim();
}

// Conditionnel passé = auxiliaire au conditionnel + participe.
export function conditionnelPasse(verb: VerbRow, subject: string, feminine = false): string {
  return `${auxConditionnel(verb.auxiliary, subject)} ${agree(verb.participle ?? "", verb.auxiliary, subject, feminine)}`.trim();
}

export { auxPresent };
