"use client";

import { useEffect, useMemo, useState } from "react";
import ActorHint from "@/components/ActorHint";

interface GlitchTurn {
  prompt: string;
  gloss: string;
  subject: string;
  answer: string;
  distractors: string[];
  explanation: string;
  formId: string;
  gender?: "f" | "m";
  caseId: string;
  caseTitle: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[j], a[i]] = [a[i], a[j]];
  }
  return a;
}

export default function Revision() {
  const [turns, setTurns] = useState<GlitchTurn[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState("");
  const [fb, setFb] = useState<{ ok: boolean; text: string } | null>(null);
  const [fixed, setFixed] = useState(0);

  useEffect(() => {
    fetch("/api/glitch")
      .then((r) => r.json())
      .then((d) => {
        setTurns(d.turns ?? []);
        setLoaded(true);
      });
  }, []);

  const turn = turns[idx] ?? null;
  const options = useMemo(
    () => (turn ? shuffle([turn.answer, ...turn.distractors]) : []),
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
        category: ok ? undefined : "glitch_review",
        detail: { caseId: turn.caseId, prompt: turn.prompt, given: picked },
      }),
    });
    if (ok) {
      setFixed((c) => c + 1);
      setFb({ ok: true, text: `Corrigé ! ${turn.explanation}` });
    } else {
      setFb({ ok: false, text: `Encore raté. ${turn.explanation}` });
    }
  }

  function next() {
    setIdx((i) => i + 1);
    setPicked("");
    setFb(null);
  }

  return (
    <main className="mx-auto max-w-2xl space-y-3 p-4 sm:p-6">
      <a href="/" className="text-sm text-blue-700">
        ← Accueil
      </a>
      <h1 className="text-2xl font-extrabold text-[#1b2a4a]">⚡ Révision Glitch</h1>
      <p className="text-sm text-gray-500">
        Tes fautes récentes reviennent te hanter — corrige-les !{" "}
        <em>(Your recent mistakes return — fix them!)</em>
      </p>

      {!loaded && <p>Chargement…</p>}
      {loaded && turns.length === 0 && (
        <div className="rounded-2xl border-2 border-green-700 bg-green-50 p-5 text-center">
          <p className="font-bold text-green-800">Aucun glitch ! 🎉</p>
          <p className="text-sm text-gray-600">
            Fais des cas (<a href="/jouer" className="font-bold text-blue-700">jouer</a>) et tes
            fautes apparaîtront ici pour révision.
          </p>
        </div>
      )}
      {turn && idx < turns.length && (
        <section className="rounded-2xl border-t-8 border-orange-500 bg-white p-6 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
            Glitch {idx + 1}/{turns.length} · de « {turn.caseTitle} » · corrigés : {fixed}
          </p>
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
                    ? "bg-orange-500 font-bold text-white"
                    : "border-2 border-gray-200 bg-white hover:border-orange-500"
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
            Vérifier
          </button>
          {fb && (
            <div
              className={`mt-3 rounded-xl border p-3 text-sm ${
                fb.ok
                  ? "border-green-700 bg-green-50 text-green-900"
                  : "border-red-500 bg-red-50 text-red-900"
              }`}
            >
              {fb.text}
              <button
                onClick={next}
                className="ml-3 rounded-full bg-[#1b2a4a] px-4 py-1 font-bold text-white"
              >
                {idx + 1 >= turns.length ? "Terminer ✓" : "Glitch suivant →"}
              </button>
            </div>
          )}
        </section>
      )}
      {loaded && turns.length > 0 && idx >= turns.length && (
        <div className="rounded-2xl border-2 border-green-700 bg-green-50 p-5 text-center">
          <p className="font-bold text-green-800">
            Révision finie : {fixed}/{turns.length} corrigés ! 🎉
          </p>
          <a href="/progres" className="font-bold text-blue-700">
            Voir mon progrès →
          </a>
        </div>
      )}
    </main>
  );
}
