"use client";

import { useEffect, useMemo, useState } from "react";

interface Turn {
  prompt: string;
  gloss: string;
  answer: string;
  distractors: string[];
  explanation: string;
  formId: string;
}

const UNLOCK_MASTERY = 50;

export default function Simulation() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [presentMastery, setPresentMastery] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [scene, setScene] = useState("");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState("");
  const [fb, setFb] = useState<{ ok: boolean; text: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    Promise.all([fetch("/api/progress").then((r) => r.json()), fetch("/api/cases").then((r) => r.json())]).then(
      ([p, c]) => {
        const present = (p.progress ?? []).find((r: { formId: string }) => r.formId === "present");
        const mastery = present?.mastery ?? 0;
        setPresentMastery(mastery);
        setUnlocked(mastery >= UNLOCK_MASTERY);
        const sim = (c.cases ?? []).find((x: { id: string }) => x.id === "sim1");
        if (sim) {
          setTurns(sim.dialogue.turns);
          setScene(sim.dialogue.scene);
        }
      }
    );
  }, []);

  const turn = turns[idx] ?? null;
  const options = useMemo(
    () => (turn ? [...[turn.answer, ...turn.distractors]].sort(() => Math.random() - 0.5) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turn?.prompt]
  );

  async function check() {
    if (!turn || !picked) return;
    const ok = picked === turn.answer;
    await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: turn.formId,
        correct: ok,
        category: ok ? undefined : "simulation",
        detail: { caseId: "sim1", prompt: turn.prompt, given: picked },
      }),
    });
    if (ok) {
      setCorrectCount((n) => n + 1);
      setFb({ ok: true, text: `Exact ! ${turn.explanation}` });
    } else {
      setFb({ ok: false, text: `L'inspecteur fronce les sourcils… ${turn.explanation}` });
    }
  }

  async function next() {
    if (idx + 1 >= turns.length) {
      setDone(true);
      const acc = correctCount / turns.length;
      const s = acc === 1 ? 3 : acc >= 0.5 ? 2 : 1;
      for (const f of ["passe_compose", "imparfait"]) {
        await fetch("/api/stars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formId: f, stars: s }),
        });
      }
    } else {
      setIdx((i) => i + 1);
      setPicked("");
      setFb(null);
    }
  }

  if (unlocked === null) return <main className="p-6">Chargement…</main>;

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-2xl space-y-3 p-4 text-center sm:p-6">
        <a href="/" className="text-sm text-blue-700">
          ← Accueil
        </a>
        <h1 className="text-2xl font-extrabold text-[#1b2a4a]">🎁 Grande Simulation verrouillée</h1>
        <p className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-teal-600 bg-teal-50 p-5">
          <strong>Une journée à Paris</strong> se débloque avec <strong>Maîtrise du présent ≥ {UNLOCK_MASTERY} %</strong>.
          <span className="block text-sm text-gray-600">
            Actuellement : {presentMastery} % — <a href="/jouer" className="font-bold text-blue-700">joue des cas</a> !
          </span>
        </p>
      </main>
    );
  }

  if (done) {
    return (
      <main className="mx-auto max-w-2xl space-y-3 p-4 text-center sm:p-6">
        <h1 className="text-2xl font-extrabold text-[#1b2a4a]">Enquête bouclée ! 🎭</h1>
        <p>
          {correctCount}/{turns.length} correct · <a href="/progres" className="font-bold text-blue-700">Voir mon progrès →</a>
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl space-y-3 p-4 sm:p-6">
      <a href="/" className="text-sm text-blue-700">
        ← Accueil
      </a>
      <section className="rounded-2xl border-2 border-dashed border-teal-600 bg-teal-50 p-6">
        <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
          🎭 Grande Simulation · {idx + 1}/{turns.length}
        </p>
        <h1 className="text-xl font-extrabold text-[#1b2a4a]">Reconstituer la soirée</h1>
        <p className="text-sm text-gray-600">{scene} — le temps n&apos;est pas annoncé !</p>
        {turn && (
          <>
            <p className="mt-3 text-lg">
              <strong>{turn.prompt}</strong>
              <span className="block text-sm text-gray-500">{turn.gloss}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {options.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setPicked(o);
                    setFb(null);
                  }}
                  className={`rounded-full px-4 py-2 text-sm ${
                    picked === o
                      ? "bg-teal-600 font-bold text-white"
                      : "border-2 border-gray-200 bg-white hover:border-teal-600"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            <button
              onClick={check}
              disabled={!picked}
              className="mt-3 rounded-xl bg-gradient-to-r from-green-700 to-teal-600 px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Répondre
            </button>
            {fb && (
              <div
                className={`mt-3 rounded-xl border bg-white p-3 text-sm ${
                  fb.ok ? "border-green-700 text-green-900" : "border-red-500 text-red-900"
                }`}
              >
                {fb.text}
                <button
                  onClick={next}
                  className="ml-3 rounded-full bg-[#1b2a4a] px-4 py-1 font-bold text-white"
                >
                  Continuer →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
