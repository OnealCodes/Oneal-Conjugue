"use client";

import { useEffect, useMemo, useState } from "react";
import ActorHint from "@/components/ActorHint";

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
  gender?: "f" | "m";
}

interface CaseRow {
  id: string;
  chapter: string;
  title: string;
  dialogue: { scene: string; sceneGloss: string; turns: Turn[] };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Jouer() {
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [turnIdx, setTurnIdx] = useState(0);
  const [picked, setPicked] = useState("");
  const [typed, setTyped] = useState("");
  const [fb, setFb] = useState<{ ok: boolean; text: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch("/api/cases")
      .then((r) => r.json())
      .then((d) => setCases(d.cases ?? []));
  }, []);

  const active = cases.find((c) => c.id === caseId) ?? null;
  const turn = active ? active.dialogue.turns[turnIdx] : null;
  const options = useMemo(
    () => (turn ? shuffle([turn.answer, ...turn.distractors]) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turn?.prompt]
  );

  function start(id: string) {
    setCaseId(id);
    setTurnIdx(0);
    setPicked("");
    setTyped("");
    setFb(null);
    setCorrectCount(0);
    setDone(false);
    setStars(0);
  }

  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    window.speechSynthesis.speak(u);
  }

  async function check() {
    if (!turn || !active) return;
    const clean = typed.trim().toLowerCase();
    const given = clean || picked;
    if (!given) {
      setFb({ ok: false, text: "Choisis une forme ou écris-la." });
      return;
    }
    const ok = given === turn.answer.toLowerCase();
    const formId = turn.formId;
    await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId,
        correct: ok,
        kind: clean ? "typed" : "chip",
        category: ok ? undefined : "mauvais_sujet",
        detail: { caseId: active.id, prompt: turn.prompt, given },
      }),
    });
    if (ok) {
      setCorrectCount((c) => c + 1);
      setFb({ ok: true, text: `Bravo ! ${turn.explanation}` });
    } else {
      setFb({ ok: false, text: `Pas encore. ${turn.explanation}` });
    }
  }

  async function next() {
    if (!active) return;
    if (turnIdx + 1 >= active.dialogue.turns.length) {
      const total = active.dialogue.turns.length;
      const acc = correctCount / total;
      const s = acc === 1 ? 3 : acc >= 0.5 ? 2 : 1;
      setStars(s);
      setDone(true);
      await fetch("/api/stars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: "present", stars: s }),
      });
    } else {
      setTurnIdx((i) => i + 1);
      setPicked("");
      setTyped("");
      setFb(null);
    }
  }

  if (!active) {
    return (
      <main className="mx-auto max-w-4xl space-y-3 p-4 sm:p-6">
        <a href="/" className="text-sm text-blue-700">← Accueil</a>
        <h1 className="text-2xl font-extrabold text-[#1b2a4a]">Cas · A1–B2</h1>
        <div className="grid gap-2">
          {cases
            .filter((c) => c.chapter !== "SIM")
            .map((c, i) => (
            <button
              key={c.id}
              onClick={() => start(c.id)}
              className="rounded-2xl border-2 border-gray-200 bg-white p-4 text-left hover:border-red-500"
            >
              <strong>
                Cas {i + 1} — {c.title}
              </strong>
              <span className="block text-sm text-gray-500">
                [{c.chapter}] {c.dialogue.scene}
              </span>
            </button>
          ))}
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="mx-auto max-w-2xl space-y-3 p-4 text-center sm:p-6">
        <h1 className="text-2xl font-extrabold text-[#1b2a4a]">Cas terminé !</h1>
        <p className="text-5xl tracking-widest text-yellow-500">
          {"★".repeat(stars)}
          <span className="text-gray-300">{"★".repeat(3 - stars)}</span>
        </p>
        <p>
          {correctCount}/{active.dialogue.turns.length} correct ·{" "}
          <a href="/progres" className="font-bold text-blue-700">
            Voir mon progrès →
          </a>
        </p>
        <button
          onClick={() => setCaseId(null)}
          className="rounded-full border-2 border-gray-200 bg-white px-6 py-2 font-bold"
        >
          Autre cas
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl space-y-3 p-4 sm:p-6">
      <button onClick={() => setCaseId(null)} className="text-sm text-blue-700">
        ← Tous les cas
      </button>
      <section className="rounded-2xl border-t-8 border-red-500 bg-white p-6 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
          {active.title} · {turnIdx + 1}/{active.dialogue.turns.length}
          {turn?.mixed && (
            <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-orange-700">
              ⚡ temps non annoncé
            </span>
          )}
        </p>
        <div className="mt-2 rounded-xl bg-violet-100 p-3 text-[0.95rem]">
          <strong className="text-violet-800">{active.dialogue.scene}</strong>
          <span className="block text-sm text-gray-500">{active.dialogue.sceneGloss}</span>
        </div>
        {turn && (
          <>
            <p className="mt-3 text-lg">
              <strong>{turn.prompt}</strong>
              <span className="block text-sm text-gray-500">{turn.gloss}</span>
              <span className="mt-1 block">
                <ActorHint subject={turn.subject} gender={turn.gender} />
              </span>
              <button
                onClick={() => speak(turn.prompt.replace("___", turn.answer))}
                aria-label="Écouter la phrase"
                className="mt-1 rounded-full border-2 border-gray-200 bg-white px-3 py-0.5 text-sm hover:border-blue-700"
              >
                🔊 Écouter
              </button>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {options.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setPicked(o);
                    setTyped("");
                    setFb(null);
                  }}
                  className={`rounded-full px-4 py-2 text-sm ${
                    picked === o && !typed
                      ? "bg-red-500 font-bold text-white"
                      : "border-2 border-gray-200 bg-white hover:border-red-500"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={typed}
                onChange={(e) => {
                  setTyped(e.target.value);
                  setPicked("");
                  setFb(null);
                }}
                placeholder="…ou écris la forme"
                autoComplete="off"
                lang="fr"
                className="flex-1 rounded-xl border-2 border-gray-200 px-3 py-2 text-lg"
              />
              <button
                onClick={check}
                className="rounded-xl bg-gradient-to-r from-green-700 to-teal-600 px-5 py-2 font-bold text-white"
              >
                Vérifier
              </button>
            </div>
            {fb && (
              <div
                className={`mt-3 rounded-xl border p-3 text-sm ${
                  fb.ok
                    ? "border-green-700 bg-green-50 text-green-900"
                    : "border-red-500 bg-red-50 text-red-900"
                }`}
              >
                {fb.text}
                {fb.ok && (
                  <button
                    onClick={next}
                    className="ml-3 rounded-full bg-[#1b2a4a] px-4 py-1 font-bold text-white"
                  >
                    Continuer →
                  </button>
                )}
              </div>
            )}
            {fb && !fb.ok && (
              <button
                onClick={next}
                className="mt-2 rounded-full border-2 border-gray-200 bg-white px-4 py-1 text-sm font-bold"
              >
                Passer à la suite →
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}
