"use client";

import { useEffect, useState } from "react";

interface ProgressRow {
  formId: string;
  stars: number;
  mastery: number;
  dueForReview: boolean;
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
  passe_compose: "Passé composé",
  imparfait: "Imparfait",
  futur: "Futur simple",
  subjonctif: "Subjonctif présent",
  conditionnel_present: "Conditionnel présent",
  plus_que_parfait: "Plus-que-parfait",
  conditionnel_passe: "Conditionnel passé",
  futur_anterieur: "Futur antérieur",
  subjonctif_passe: "Subjonctif passé",
  passe_simple: "Passé simple (lecture)",
  imparfait_subjonctif: "Imparfait du subjonctif (lecture)",
  passe_anterieur: "Passé antérieur (lecture)",
};

interface DimRow {
  formId: string;
  kind: string;
  total: number;
  hits: number;
}

export default function Progres() {
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [mistakes, setMistakes] = useState<MistakeRow[]>([]);
  const [dims, setDims] = useState<DimRow[]>([]);

  useEffect(() => {
    fetch("/api/progress")
      .then((r) => r.json())
      .then((d) => {
        setProgress(d.progress ?? []);
        setMistakes(d.mistakes ?? []);
        setDims(d.dimensions ?? []);
      });
  }, []);

  function dimLine(formId: string) {
    const rows = dims.filter((x) => x.formId === formId);
    if (rows.length === 0) return null;
    const part = (kind: string, icon: string, label: string) => {
      const r = rows.find((x) => x.kind === kind);
      if (!r) return null;
      const pct = r.total > 0 ? Math.round((100 * r.hits) / r.total) : 0;
      return (
        <span key={kind} className="mr-3">
          {icon} {label} : {r.hits}/{r.total} ({pct} %)
        </span>
      );
    };
    return (
      <p className="mt-1 text-xs text-gray-600">
        {part("chip", "👁", "reco")} {part("typed", "✍️", "prod")}
      </p>
    );
  }

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
            {p.dueForReview && (
              <p className="mt-1 text-xs font-bold text-orange-600">
                ⏳ À réviser — 3+ jours sans pratique (retention check)
              </p>
            )}
            {dimLine(p.formId)}
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
