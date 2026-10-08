"use client";

import { useEffect, useMemo, useState } from "react";
import ActorHint from "@/components/ActorHint";

interface Turn {
  prompt: string;
  gloss: string;
  answer: string;
  distractors: string[];
  explanation: string;
  formId: string;
  subject: string;
  gender?: "f" | "m";
}

interface SimCase {
  id: string;
  title: string;
  dialogue: { scene: string; turns: Turn[] };
}

// Unlock rules per simulation (PRD §13: mastery-gated rewards).
const SIM_RULES: Record<string, { form: string; min: number; label: string }> = {
  sim1: { form: "present", min: 50, label: "Maîtrise du présent ≥ 50 %" },
  sim2: { form: "subjonctif", min: 50, label: "Maîtrise du subjonctif ≥ 50 %" },
};

export default function Simulation() {
  const [sims, setSims] = useState<SimCase[]>([]);
  const [mastery, setMastery] = useState<Record<string, number>>({});
  const [simId, setSimId] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState("");
  const [fb, setFb] = useState<{ ok: boolean; text: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    Promise.all([fetch("/api/progress").then((r) => r.json()), fetch("/api/cases").then((r) => r.json())]).then(
      ([p, c]) => {
        const m: Record<string, number> = {};
        for (const r of p.progress ?? []) m[r.formId] = r.mastery;
        setMastery(m);
        setSims((c.cases ?? []).filter((x: { chapter: string }) => x.chapter === "SIM"));
      }
    );
  }, []);

  const active = sims.find((s) => s.id === simId) ?? null;
  const turn = active ? active.dialogue.turns[idx] : null;
  const options = useMemo(
    () => (turn ? [...[turn.answer, ...turn.distractors]].sort(() => Math.random() - 0.5) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turn?.prompt]
  );

  function isOpen(id: string) {
    const rule = SIM_RULES[id];
    return rule ? (mastery[rule.form] ?? 0) >= rule.min : true;
  }

  function start(id: string) {
    setSimId(id);
    setIdx(0);
    setPicked("");
    setFb(null);
    setCorrectCount(0);
    setDone(false);
  }

  async function check() {
    if (!turn || !picked || !active) return;
    const ok = picked === turn.answer;
    await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: turn.formId,
        correct: ok,
        kind: "chip",
        category: ok ? undefined : "simulation",
        detail: { caseId: active.id, prompt: turn.prompt, given: picked },
      }),
    });
    if (ok) {
      setCorrectCount((n) => n + 1);
      setFb({ ok: true, text: `Exact ! ${turn.explanation}` });
    } else {
      setFb({ ok: false, text: `La scène se fige… ${turn.explanation}` });
    }
  }

  async function next() {
    if (!active) return;
    if (idx + 1 >= active.dialogue.turns.length) {
      setDone(true);
      const acc = correctCount / active.dialogue.turns.length;
      const s = acc === 1 ? 3 : acc >= 0.5 ? 2 : 1;
      const forms = [...new Set(active.dialogue.turns.map((t) => t.formId))];
      for (const f of forms) {
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

  if (!simId) {
    return (
      <main className="mx-auto max-w-2xl space-y-3 p-4 sm:p-6">
        <a href="/" className="text-sm text-blue-700">
          ← Accueil
        </a>
        <h1 className="text-2xl font-extrabold text-[#1b2a4a]">🎭 Grandes Simulations</h1>
        {sims.map((s) => {
          const rule = SIM_RULES[s.id];
          const open = isOpen(s.id);
          return (
            <div
              key={s.id}
              className={`rounded-2xl border-2 p-5 ${
                open ? "border-teal-600 bg-teal-50" : "border-dashed border-gray-300 bg-gray-50"
              }`}
            >
              <h2 className="font-bold">
                {open ? "🎭" : "🔒"} {s.title}
              </h2>
              {open ? (
                <button
                  onClick={() => start(s.id)}
                  className="mt-2 rounded-full bg-teal-600 px-5 py-2 font-bold text-white"
                >
                  Entrer dans la scène →
                </button>
              ) : (
                <p className="mt-1 text-sm text-gray-600">
                  Se débloque avec : {rule?.label} (actuellement {mastery[rule?.form ?? ""] ?? 0} % —{" "}
                  <a href="/jouer" className="font-bold text-blue-700">
                    jouer
                  </a>
                  )
                </p>
              )}
            </div>
          );
        })}
      </main>
    );
  }

  if (done && active) {
    return (
      <main className="mx-auto max-w-2xl space-y-3 p-4 text-center sm:p-6">
        <h1 className="text-2xl font-extrabold text-[#1b2a4a]">Scène bouclée ! 🎭</h1>
        <p>
          {correctCount}/{active.dialogue.turns.length} correct ·{" "}
          <a href="/progres" className="font-bold text-blue-700">
            Voir mon progrès →
          </a>
        </p>
        <button
          onClick={() => setSimId(null)}
          className="rounded-full border-2 border-gray-200 bg-white px-6 py-2 font-bold"
        >
          Autre simulation
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl space-y-3 p-4 sm:p-6">
      <button onClick={() => setSimId(null)} className="text-sm text-blue-700">
        ← Simulations
      </button>
      <section className="rounded-2xl border-2 border-dashed border-teal-600 bg-teal-50 p-6">
        <p className="text-xs font-extrabold uppercase tracking-widest text-teal-800">
          🎭 {active?.title} · {idx + 1}/{active?.dialogue.turns.length}
        </p>
        <p className="text-sm text-gray-600">{active?.dialogue.scene} — le temps n&apos;est pas annoncé !</p>
        <div className="mt-2 overflow-hidden rounded-xl">
          <div
            className="h-6"
            style={{ background: "repeating-linear-gradient(90deg,#ef4135 0 22px,#fff 22px 44px)" }}
          />
          <div className="flex items-end justify-around bg-gradient-to-b from-sky-200 to-green-200 px-4 pb-2 pt-1">
            <span title="L'interlocuteur" className="inline-block animate-sway text-5xl">
              🕵️
            </span>
            <span title="Toi, l'apprenti" className="inline-block animate-bounce text-5xl">
              🧙
            </span>
          </div>
        </div>
        {turn && (
          <>
            <p className="mt-3 text-lg">
              <strong>{turn.prompt}</strong>
              <span className="block text-sm text-gray-500">{turn.gloss}</span>
              <span className="mt-1 block">
                <ActorHint subject={turn.subject} gender={turn.gender} />
              </span>
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
