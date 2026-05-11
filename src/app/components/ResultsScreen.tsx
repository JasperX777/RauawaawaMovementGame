import { useNavigate, useLocation } from "react-router";
import { Trophy, Home, RotateCcw, Star, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function ResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { monstersDefeated = 12, score = 1200 } = location.state || {};

  // Determine performance message with Māori affirmations
  const getPerformanceMessage = () => {
    if (monstersDefeated >= 15) {
      return {
        maori: "Tino pai rawa atu!",
        english: "Outstanding! You are a true warrior like Kupe!"
      };
    } else if (monstersDefeated >= 10) {
      return {
        maori: "Ka rawe!",
        english: "Excellent work! Your movements were strong and accurate!"
      };
    } else if (monstersDefeated >= 5) {
      return {
        maori: "Kei te pai!",
        english: "Good effort! Keep practicing your movements!"
      };
    } else {
      return {
        maori: "Ka pai tō kaha!",
        english: "Well done for trying! Practice makes perfect!"
      };
    }
  };

  const message = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-teal-50 to-cyan-50 flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Māori Koru Pattern Decorations */}
      <div className="absolute top-10 left-10 w-48 h-48 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-800">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-10 right-10 w-48 h-48 opacity-10 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-800">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-800">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-5xl w-full text-center relative z-10">
        {/* Success Icon with Māori Styling */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-48 h-48 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-2xl border-8 border-amber-300">
              <Trophy className="w-28 h-28 text-amber-200" />
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
            <div className="w-20 h-2 bg-red-700 rounded-full"></div>
            <div className="w-20 h-2 bg-slate-800 rounded-full"></div>
            <div className="w-20 h-2 bg-red-700 rounded-full"></div>
          </div>

          <h1 className="text-7xl mb-6 text-red-700 font-bold">
            {message.maori}
          </h1>
          <p className="text-4xl text-slate-700 mb-6 font-semibold">
            Time's Up!
          </p>
          <p className="text-3xl text-slate-600 mb-8">
            You have protected the people from the sea creatures!
          </p>

          {/* Traditional Pattern Border */}
          <div className="flex justify-center gap-2">
            <div className="w-20 h-2 bg-red-700 rounded-full"></div>
            <div className="w-20 h-2 bg-slate-800 rounded-full"></div>
            <div className="w-20 h-2 bg-red-700 rounded-full"></div>
          </div>
        </div>

        {/* Main Stats - Lives Saved (Hero Stat) */}
        <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-3xl shadow-2xl p-12 mb-8 border-4 border-amber-300">
          <p className="text-4xl text-amber-100 mb-4 font-semibold">Lives Saved | Ora Kua Ora</p>
          <p className="text-9xl text-white font-bold mb-4">{monstersDefeated}</p>
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-12 h-12 text-amber-300 fill-amber-300" />
            <p className="text-3xl text-amber-100 font-medium">You are a protector!</p>
            <Zap className="w-12 h-12 text-amber-300 fill-amber-300" />
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10 border-4 border-red-200">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl p-10 border-4 border-amber-300">
              <p className="text-3xl text-red-700 mb-4 font-semibold">Final Score | Kaute Whakamutunga</p>
              <p className="text-7xl text-red-800 font-bold">{score}</p>
            </div>
          </div>
        </div>

        {/* Encouragement Message with Māori Affirmation */}
        <div className="bg-gradient-to-r from-red-100 via-amber-100 to-red-100 border-4 border-red-300 rounded-2xl p-10 mb-12 shadow-lg">
          <p className="text-4xl text-red-800 font-bold mb-4">
            {message.english}
          </p>
          <p className="text-2xl text-slate-700 italic mt-4">
            "Kia kaha, kia māia - Be strong, be brave"
          </p>
        </div>

        {/* Action Buttons with Māori Cultural Styling */}
        <div className="flex gap-6 justify-center flex-wrap">
          <Button
            onClick={() => navigate("/gameplay")}
            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-16 py-10 text-3xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center gap-4 border-4 border-amber-300"
          >
            <RotateCcw className="w-10 h-10" />
            Tākaro Anō | Play Again
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-4 border-red-600 text-red-700 hover:bg-red-50 px-16 py-10 text-3xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-4 h-auto bg-white"
          >
            <Home className="w-10 h-10" />
            Kāinga | Home
          </Button>
        </div>

        {/* Cultural Blessing */}
        <div className="mt-10 bg-gradient-to-r from-amber-100 to-red-100 rounded-xl px-10 py-5 border-2 border-red-200 shadow-md">
          <p className="text-2xl text-red-800 italic font-medium">
            Nō reira, haere rā - Until we meet again
          </p>
        </div>

        {/* View Flow Diagram Link */}
        <div className="mt-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/flow")}
            className="text-xl text-slate-600 hover:text-slate-800"
          >
            View User Flow Diagram
          </Button>
        </div>
      </div>
    </div>
  );
}