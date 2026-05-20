import { useNavigate, useLocation } from "react-router";
import { Trophy, Home, RotateCcw, Star } from "lucide-react";
import { Button } from "./ui/button";

export function ResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    monstersDefeated = 12,
    score = 1200,
    resultType = "win",
    stageReached = 4,
  } = location.state || {};
  const isWin = resultType === "win";
  const stagesCleared = isWin ? 4 : Math.max(0, Math.min(4, stageReached - 1));

  // Keep the result page focused on encouragement and journey completion.
  const getPerformanceMessage = () => {
    if (isWin) {
      return {
        maori: "Ka mau te wehi!",
        english: "Wonderful work. You completed Kupe's full journey and protected the people."
      };
    }

    if (monstersDefeated >= 10) {
      return {
        maori: "Ka rawe!",
        english: "Beautiful effort. Your movements were strong and steady."
      };
    }

    return {
      maori: "Ka pai tō kaha!",
      english: "Well done for playing. Every movement helps build strength and confidence."
    };
  };

  const message = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.28),_transparent_28%),linear-gradient(180deg,_#0a2942_0%,_#114b6e_42%,_#16728d_76%,_#d9f5ff_100%)] flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Māori Koru Pattern Decorations */}
      <div className="absolute top-10 left-10 w-48 h-48 opacity-12">
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-100">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-10 right-10 w-48 h-48 opacity-12 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-100">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 opacity-12 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-100">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cyan-100/30 to-transparent" />

      <div className="max-w-5xl w-full text-center relative z-10">
        {/* Success Icon with Māori Styling */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-48 h-48 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-2xl border-8 border-amber-300">
              <Trophy className="w-28 h-28 text-amber-100" />
            </div>
            {/* Decorative stars */}
            <Star className="absolute -top-6 -left-6 w-16 h-16 text-amber-400 fill-amber-400 animate-pulse" />
            <Star className="absolute -top-6 -right-6 w-16 h-16 text-amber-400 fill-amber-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <Star className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 text-amber-400 fill-amber-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>

        {/* Victory Message with Māori Elements */}
        <div className="mb-12">
          {/* Traditional Pattern Border */}
          <div className="mb-6 flex justify-center gap-2">
            <div className="w-20 h-2 bg-amber-300 rounded-full"></div>
            <div className="w-20 h-2 bg-cyan-100 rounded-full"></div>
            <div className="w-20 h-2 bg-amber-300 rounded-full"></div>
          </div>

          <h1 className="text-7xl mb-6 text-white font-bold">
            {message.maori}
          </h1>
          <p className="text-4xl text-cyan-50 mb-6 font-semibold">
            {isWin ? "All Four Stages Complete" : "A Strong Journey Today"}
          </p>
          <p className="text-3xl text-cyan-100 mb-8">
            {isWin
              ? "You completed the full four-stage journey and helped protect the people from the sea creatures."
              : `You reached stage ${stageReached}. Every movement still helped protect the people and supported your wellbeing.`}
          </p>

          {/* Traditional Pattern Border */}
          <div className="flex justify-center gap-2">
            <div className="w-20 h-2 bg-amber-300 rounded-full"></div>
            <div className="w-20 h-2 bg-cyan-100 rounded-full"></div>
            <div className="w-20 h-2 bg-amber-300 rounded-full"></div>
          </div>
        </div>

        {/* Result Summary */}
        <div className="mb-10">
          <div className="bg-gradient-to-br from-cyan-500/88 to-teal-500/88 rounded-3xl shadow-2xl p-12 mb-6 border-4 border-amber-200 backdrop-blur-sm">
            <p className="text-4xl text-amber-100 mb-4 font-semibold">Final Score | Kaute Whakamutunga</p>
            <p className="text-9xl text-slate-950 font-bold">{score}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-sky-100 to-cyan-100 rounded-2xl p-10 border-4 border-cyan-200/70 shadow-xl">
              <p className="text-3xl text-sky-900 mb-4 font-semibold">Stages Cleared | Haerenga</p>
              <p className="text-7xl text-slate-950 font-bold">{stagesCleared}/4</p>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-10 border-4 border-amber-300 shadow-xl">
              <p className="text-3xl text-amber-900 mb-4 font-semibold">Total Defeated | Ngā Taniwha</p>
              <p className="text-7xl text-amber-950 font-bold">{monstersDefeated}</p>
            </div>
          </div>
        </div>

        {/* Encouragement Message with Māori Affirmation */}
        <div className="bg-slate-950/35 border-4 border-amber-200/45 rounded-2xl p-10 mb-12 shadow-lg backdrop-blur-sm">
          <p className="text-4xl text-amber-100 font-bold mb-4">
            {isWin
              ? message.english
              : "Well done for playing. Gentle movement and practice build strength over time."}
          </p>
          <p className="text-2xl text-cyan-100 italic mt-4">
            {isWin
              ? "\"Kua oti te haerenga - The journey is complete\""
              : "\"Kia kaha, kia māia - Be strong, be brave\""}
          </p>
        </div>

        {/* Action Buttons with Māori Cultural Styling */}
        <div className="flex gap-6 justify-center flex-wrap">
          <Button
            onClick={() => navigate("/gameplay")}
            className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 px-16 py-10 text-3xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center gap-4 border-4 border-amber-200"
          >
            <RotateCcw className="w-10 h-10" />
            Tākaro Anō | Play Again
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-4 border-cyan-200/60 text-cyan-50 hover:bg-cyan-50/10 px-16 py-10 text-3xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-4 h-auto bg-slate-950/35 backdrop-blur-sm"
          >
            <Home className="w-10 h-10" />
            Kāinga | Home
          </Button>
        </div>

        {/* Cultural Blessing */}
        <div className="mt-10 bg-slate-950/30 rounded-xl px-10 py-5 border-2 border-amber-200/45 shadow-md backdrop-blur-sm">
          <p className="text-2xl text-amber-100 italic font-medium">
            Nō reira, haere rā - Until we meet again
          </p>
        </div>

        {/* View Flow Diagram Link */}
        <div className="mt-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/flow")}
            className="text-xl text-cyan-100 hover:text-white"
          >
            View User Flow Diagram
          </Button>
        </div>
      </div>
    </div>
  );
}
