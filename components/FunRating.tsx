"use client";

import { useState } from "react";

export default function FunRating() {
  const [score, setScore] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <section className="rounded-2xl border-t-8 border-yellow-500 bg-white p-6 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
        Test de plaisir · Fun check
      </p>
      <h2 className="mt-1 text-xl font-bold text-[#1b2a4a]">
        Est-ce que c’était amusant ?
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Prototype démo — ta note n’est enregistrée nulle part.{" "}
        <em>(Demo only — your rating is not saved anywhere.)</em>
      </p>
      <div className="mt-3 flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => {
              setScore(n);
              setSent(false);
            }}
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            className={`rounded-xl border-2 px-4 py-2 text-2xl ${
              n <= score
                ? "border-yellow-500 bg-yellow-50"
                : "border-gray-200 bg-white hover:border-yellow-500"
            }`}
          >
            {n <= score ? "⭐" : "☆"}
          </button>
        ))}
      </div>
      <button
        onClick={() => score > 0 && setSent(true)}
        disabled={score === 0}
        className="mt-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-6 py-2.5 font-bold text-white disabled:opacity-40"
      >
        Envoyer ma note
      </button>
      {sent && (
        <p className="mt-3 rounded-xl border border-green-700 bg-green-50 p-3 text-sm text-green-900">
          Merci ! Note enregistrée dans cette démo uniquement : {score}/5. 🎉
        </p>
      )}
    </section>
  );
}
