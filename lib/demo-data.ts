// Phase 0 demo data — fictional sample content for the prototype only.
// Nothing here is persisted. Real curriculum content arrives in Phase 1+.

export interface WorkshopOption {
  value: string;
  /** Shown when this wrong option is picked */
  whyWrong?: string;
}

export interface WorkshopExercise {
  id: string;
  scene: string;
  sceneGloss: string;
  prompt: string;
  verb: string;
  tense: string;
  subjects: string[];
  expected: Record<string, string>;
  options: WorkshopOption[];
  successNote: string;
}

export const workshopExercise: WorkshopExercise = {
  id: "a1-present-etre",
  scene: "Marchand : Bonjour ! Vous êtes nouveau ici ?",
  sceneGloss: "Hello! Are you new here?",
  prompt: "Oui, ___ nouveau.",
  verb: "être",
  tense: "présent",
  subjects: ["je", "tu", "il"],
  expected: { je: "suis", tu: "es", il: "est" },
  options: [
    { value: "suis", whyWrong: "« suis » va avec « je », pas ici." },
    { value: "es", whyWrong: "« es » va avec « tu », pas avec ce sujet." },
    { value: "est", whyWrong: "« est » va avec « il / elle », pas avec ce sujet." },
    { value: "sommes", whyWrong: "« sommes » va avec « nous », pas avec ce sujet." },
    { value: "êtes", whyWrong: "« êtes » va avec « vous », pas avec ce sujet." },
    { value: "sont", whyWrong: "« sont » va avec « ils / elles », pas avec ce sujet." },
  ],
  successNote: "— être au présent. Léo est fier de toi !",
};

export interface ReplayScenario {
  id: string;
  sentence: string;
  verb1Choices: string[];
  verb2Choices: string[];
  correct: { verb1: string; verb2: string };
  explanation: string;
}

export const replayScenario: ReplayScenario = {
  id: "pc-vs-imparfait",
  sentence: "Hier soir, le voleur ___ (entrer) pendant que le gardien ___ (dormir).",
  verb1Choices: ["est entré", "entrait"],
  verb2Choices: ["a dormi", "dormait"],
  correct: { verb1: "est entré", verb2: "dormait" },
  explanation:
    "L'entrée du voleur est un événement unique et terminé → passé composé (« est entré », snapshot). " +
    "Le gardien qui dormait, c'est le décor en cours → imparfait (« dormait », fond continu).",
};
