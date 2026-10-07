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

      <nav className="grid gap-2 sm:grid-cols-2">
        <a
          href="/jouer"
          className="rounded-2xl bg-[#1b2a4a] p-5 font-bold text-white hover:brightness-125"
        >
          ⚔ Jouer les cas A1 →
          <span className="block text-sm font-normal text-white/70">
            8 cas · étoiles et maîtrise enregistrées
          </span>
        </a>
        <a
          href="/progres"
          className="rounded-2xl border-2 border-blue-700 bg-white p-5 font-bold text-blue-800 hover:bg-blue-50"
        >
          🏆 Mon progrès →
          <span className="block text-sm font-normal text-gray-500">
            maîtrise, étoiles, banque de fautes
          </span>
        </a>
        <a
          href="/revision"
          className="rounded-2xl border-2 border-orange-500 bg-white p-5 font-bold text-orange-700 hover:bg-orange-50"
        >
          ⚡ Révision Glitch →
          <span className="block text-sm font-normal text-gray-500">
            tes fautes reviennent te hanter
          </span>
        </a>
        <a
          href="/simulation"
          className="rounded-2xl border-2 border-dashed border-teal-600 bg-teal-50 p-5 font-bold text-teal-800 hover:bg-teal-100"
        >
          🎭 Grande Simulation →
          <span className="block text-sm font-normal text-gray-500">
            Reconstituer la soirée (débloque à 50 %)
          </span>
        </a>
      </nav>

      <footer className="pb-6 text-center text-xs text-gray-500">
        Oneal Conjugue! — prototype Phase 0 · données fictives ·{" "}
        <em>fictional demo data, no backend, no database yet</em>
      </footer>
    </main>
  );
}
