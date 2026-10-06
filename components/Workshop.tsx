"use client";

import { useState } from "react";
import { workshopExercise } from "@/lib/demo-data";

export default function Workshop() {
  const ex = workshopExercise;
  const [subject, setSubject] = useState("je");
  const [picked, setPicked] = useState("");
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<"idle" | "ok" | "ko">("idle");
  const [message, setMessage] = useState("");

  const expected = ex.expected[subject];

  function check() {
    const clean = typed.trim().toLowerCase().replace(/^j['’]\s*/, "").replace(/^(je|tu|il)\s+/, "");
    const answer = clean || picked;
    if (!answer) {
      setResult("ko");
      setMessage("Choisis une forme ou écris-la. / Pick a form or type it.");
      return;
    }
    if (answer === expected) {
      setResult("ok");
      setMessage(`Bravo ! « ${subject} ${expected} » ${ex.successNote}`);
    } else {
      const opt = ex.options.find((o) => o.value === answer);
      setResult("ko");
      setMessage(
        `Pas encore. Avec « ${subject} » (${ex.verb}, ${ex.tense}), il faut « ${expected} ». ` +
          (opt?.whyWrong ?? "Essaie encore !")
      );
    }
  }

  function reset() {
    setPicked("");
    setTyped("");
    setResult("idle");
    setMessage("");
  }

  return (
    <section className="rounded-2xl border-t-8 border-red-500 bg-white p-6 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
        L&apos;Atelier de conjugaison · The Workshop
      </p>
      <h2 className="mt-1 text-xl font-bold text-[#1b2a4a]">Construis la forme</h2>
      <div className="mt-3 rounded-xl bg-violet-100 p-3 text-[0.95rem]">
        <strong className="text-violet-800">Marchand :</strong> {ex.scene}{" "}
        <span className="block text-sm text-gray-500">{ex.sceneGloss}</span>
      </div>

      <p className="mt-3 text-lg">
        Complétez : <strong>Oui, … nouveau.</strong> <em>({ex.verb}, {ex.tense})</em>
      </p>

      <p className="mt-4 text-sm text-gray-500">1 · Choisis le sujet (subject)</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {ex.subjects.map((s) => (
          <button
            key={s}
            onClick={() => {
              setSubject(s);
              reset();
            }}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              subject === s
                ? "bg-blue-700 text-white"
                : "border-2 border-gray-200 bg-white hover:border-blue-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-gradient-to-r from-[#1b2a4a] to-violet-700 p-4 text-center text-2xl text-white">
        {subject}&nbsp;
        <span className="inline-block min-w-24 border-b-4 border-dashed border-yellow-300 px-2">
          {picked || typed || "…"}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-500">2 · Choisis la forme (pick the form)</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {ex.options.map((o) => (
          <button
            key={o.value}
            onClick={() => {
              setPicked(o.value);
              setTyped("");
              setResult("idle");
            }}
            className={`rounded-full px-4 py-2 text-sm ${
              picked === o.value && !typed
                ? "bg-red-500 font-bold text-white"
                : "border-2 border-gray-200 bg-white hover:border-red-500"
            }`}
          >
            {o.value}
          </button>
        ))}
      </div>

      <label htmlFor="workshop-typed" className="mt-4 block text-sm text-gray-500">
        3 · Ou écris la forme complète (or type the full form)
      </label>
      <div className="mt-1 flex gap-2">
        <input
          id="workshop-typed"
          type="text"
          value={typed}
          onChange={(e) => {
            setTyped(e.target.value);
            setPicked("");
            setResult("idle");
          }}
          placeholder={`${subject} …`}
          autoComplete="off"
          lang="fr"
          className="flex-1 rounded-xl border-2 border-gray-200 px-3 py-2 text-lg"
        />
        <button
          onClick={check}
          className="rounded-xl bg-gradient-to-r from-green-700 to-teal-600 px-5 py-2 font-bold text-white shadow-[0_3px_0_#1c5a3c] active:translate-y-0.5 active:shadow-none"
        >
          Vérifier
        </button>
      </div>

      {result !== "idle" && (
        <div
          className={`mt-3 rounded-xl border p-3 text-sm ${
            result === "ok"
              ? "border-green-700 bg-green-50 text-green-900"
              : "border-red-500 bg-red-50 text-red-900"
          }`}
        >
          {message}
        </div>
      )}
    </section>
  );
}
