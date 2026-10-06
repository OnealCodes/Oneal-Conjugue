import Workshop from "@/components/Workshop";
import ConsequenceReplay from "@/components/ConsequenceReplay";
import FunRating from "@/components/FunRating";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl space-y-4 p-4 sm:p-6">
      <header className="rounded-2xl bg-gradient-to-r from-[#123a8f] via-violet-700 to-rose-600 p-6 text-white">
        <p className="text-xs font-extrabold uppercase tracking-widest text-yellow-200">
          Phase 0 · Prototype de validation
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">Oneal Conjugue!</h1>
        <p className="mt-2 max-w-xl text-white/90">
          Deux questions à valider : est-ce que <strong>l’Atelier</strong> est
          amusant, et est-ce que le <strong>replay des conséquences</strong> fait
          comprendre le sens des temps ? <em>(Demo only — nothing is saved.)</em>
        </p>
      </header>

      <Workshop />
      <ConsequenceReplay />
      <FunRating />

      <footer className="pb-6 text-center text-xs text-gray-500">
        Oneal Conjugue! — prototype Phase 0 · données fictives ·{" "}
        <em>fictional demo data, no backend, no database yet</em>
      </footer>
    </main>
  );
}
