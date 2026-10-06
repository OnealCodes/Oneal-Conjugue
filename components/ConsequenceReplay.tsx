"use client";

import { useState } from "react";
import { replayScenario } from "@/lib/demo-data";

export default function ConsequenceReplay() {
  const sc = replayScenario;
  const [verb1, setVerb1] = useState(sc.verb1Choices[0]);
  const [verb2, setVerb2] = useState(sc.verb2Choices[1]);
  const [played, setPlayed] = useState(false);

  const correct = verb1 === sc.correct.verb1 && verb2 === sc.correct.verb2;

  return (
    <section className="rounded-2xl border-t-8 border-blue-600 bg-white p-6 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
        Rejouer la scène · Consequence replay
      </p>
      <h2 className="mt-1 text-xl font-bold text-[#1b2a4a]">
        Vois ce que ton choix raconte
      </h2>
      <p className="mt-2 text-[0.95rem]">{sc.sentence}</p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-gray-500">entrer →</span>
          <select
            value={verb1}
            onChange={(e) => {
              setVerb1(e.target.value);
              setPlayed(false);
            }}
            className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-2"
          >
            {sc.verb1Choices.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-gray-500">dormir →</span>
          <select
            value={verb2}
            onChange={(e) => {
              setVerb2(e.target.value);
              setPlayed(false);
            }}
            className="mt-1 w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-2"
          >
            {sc.verb2Choices.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={() => setPlayed(true)}
        className="mt-3 rounded-full bg-[#1b2a4a] px-6 py-2.5 font-bold text-white hover:brightness-125"
      >
        ▶ Rejouer la scène
      </button>

      {played && (
        <div className="mt-3 space-y-2 text-sm">
          <div
            className={`rounded-xl border-2 p-3 ${
              verb1 === sc.correct.verb1
                ? "border-green-700 bg-green-50"
                : "border-orange-500 bg-orange-50"
            }`}
          >
            📸 <strong>Le voleur {verb1}</strong>
            {verb1 === sc.correct.verb1
              ? " — un flash unique, événement terminé (snapshot)."
              : " — en continu ? Un cambriolage qui dure des heures ? Revois le choix !"}
          </div>
          <div
            className={`rounded-xl border-2 p-3 ${
              verb2 === sc.correct.verb2
                ? "border-green-700 bg-green-50"
                : "border-orange-500 bg-orange-50"
            }`}
          >
            🌫️ <strong>Le gardien {verb2}</strong>
            {verb2 === sc.correct.verb2
              ? " — le décor continue en fond (background)."
              : " — un seul ronflement sec ? Le décor devrait durer ! Revois le choix !"}
          </div>
          <div
            className={`rounded-xl border p-3 ${
              correct
                ? "border-green-700 bg-green-50 text-green-900"
                : "border-red-500 bg-red-50 text-red-900"
            }`}
          >
            {correct ? (
              <>
                <strong>Parfait !</strong> {sc.explanation}
              </>
            ) : (
              <>
                <strong>Le replay sonne faux.</strong> {sc.explanation}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
