"use client";

// Animated gender/number hint: the animation itself tells the learner
// who the agreement is with — swaying ♀, pulsing ♂, bouncing group.
export default function ActorHint({
  subject,
  gender = "m",
}: {
  subject: string;
  gender?: "f" | "m";
}) {
  const plural = subject === "nous" || subject === "vous" || subject === "ils";

  if (plural) {
    return (
      <span
        title="Sujet pluriel — l'accord se fait au pluriel"
        className="inline-flex items-center gap-1 rounded-full border-2 border-violet-500 bg-violet-50 px-2 py-0.5 text-xs font-bold text-violet-800"
      >
        <span className="inline-block animate-bounce text-xl">👥</span>
        {subject} · pluriel
      </span>
    );
  }
  if (gender === "f") {
    return (
      <span
        title="Sujet féminin — pense à accorder au féminin"
        className="inline-flex items-center gap-1 rounded-full border-2 border-pink-500 bg-pink-50 px-2 py-0.5 text-xs font-bold text-pink-700"
      >
        <span className="inline-block animate-sway text-xl">👩</span>
        {subject === "je" ? "je ♀" : subject} · féminin ♀
      </span>
    );
  }
  return (
    <span
      title="Sujet masculin singulier"
      className="inline-flex items-center gap-1 rounded-full border-2 border-blue-500 bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-800"
    >
      <span className="inline-block animate-pulse text-xl">👨</span>
      {subject} · masculin ♂
    </span>
  );
}
