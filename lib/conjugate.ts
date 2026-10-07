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
  let part = verb.participle ?? "";
  if (verb.auxiliary === "être") {
    if (feminine) part += "e";
    if (subject === "nous" || subject === "vous" || subject === "ils") part += "s";
  }
  return `${aux} ${part}`.trim();
}

export function imparfait(verb: VerbRow, subject: string): string {
  return `${verb.imparfaitStem ?? verb.infinitive}${IMPARFAIT_ENDINGS[subject]}`;
}

export function futur(verb: VerbRow, subject: string): string {
  const stem = verb.futurStem ?? verb.infinitive;
  return `${stem}${FUTUR_ENDINGS[subject]}`;
}
