"use client";

import { useEffect, useState } from "react";

interface ProgressRow {
  formId: string;
  stars: number;
  mastery: number;
}

interface MistakeRow {
  id: string;
  category: string;
  details: { prompt?: string; given?: string; caseId?: string } | null;
  createdAt: string;
}

const FORM_NAMES: Record<string, string> = {
  present: "Présent",
  futur_proche: "Futur proche",
  passe_compose: "Passé composé (aperçu)",
};

export default function Progres() {
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [mistakes, setMistakes] = useState<MistakeRow[]>([]);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((d) => {
        setProgress(d.progress ?? []);
        setMistakes(d.mistakes ?? []);
      });
  }, []);

  return (
    <main className="mx-auto max-w-2xl space-y-4 p-4 sm:p-6">
      <a href="/" className="text-sm text-blue-700">
        ← Accueil
      </a>
      <h1 className="text-2xl font-extrabold text-[#1b2a4a]">Mon progrès</h1>

      <section className="rounded-2xl border-l-8 border-blue-600 bg-white p-5 shadow-sm">
        <h2 className="font-bold">▮ Maîtrise par forme</h2>
        {progress.length === 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Pas encore de données — <a href="/jouer" className="font-bold text-blue-700">joue un cas</a> !
          </p>
        )}
        {progress.map((p) => (
          <div key={p.formId} className="mt-3">
            <div className="flex items-center justify-between text-sm">
              <strong>{FORM_NAMES[p.formId] ?? p.formId}</strong>
              <span>
                <span className="mr-2 text-yellow-600">{"★".repeat(p.stars)}{"☆".repeat(3 - p.stars)}</span>
                <strong>{p.mastery} %</strong>
              </span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-700 to-sky-400"
                style={{ width: `${p.mastery}%` }}
              />
            </div>
            {p.mastery >= 85 && (
              <p className="mt-1 text-xs font-bold text-green-700">Maîtrisé ✓ (≥ 85 %)</p>
            )}
          </div>
        ))}
      </section>

      <section className="rounded-2xl border-l-8 border-orange-500 bg-white p-5 shadow-sm">
        <h2 className="font-bold">Banque de fautes · Time Glitches</h2>
        {mistakes.length === 0 && (
          <p className="mt-2 text-sm text-gray-500">Aucune faute enregistrée pour l’instant.</p>
        )}
        {mistakes.map((m) => (
          <div key={m.id} className="mt-2 rounded-r-xl border-l-4 border-orange-500 bg-orange-50 p-2 text-sm">
            <strong>{m.category}</strong>
            {m.details?.prompt && <span className="block">{m.details.prompt}</span>}
            {m.details?.given && <span className="block text-red-800">donné : « {m.details.given} »</span>}
          </div>
        ))}
      </section>
    </main>
  );
}
