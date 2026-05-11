import { useNavigate } from "react-router";
import { Hand, Video, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function StartScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-cyan-50 to-teal-50 flex flex-col relative overflow-hidden">
      {/* Māori Koru Pattern Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-800">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-800">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>

      {/* Navigation to Flow Diagram */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="outline"
          onClick={() => navigate("/flow")}
          className="text-lg px-6 py-3 h-auto bg-white/90 backdrop-blur-sm border-2 border-slate-300 hover:bg-white shadow-lg"
        >
          View User Flow
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-6xl mx-auto w-full relative z-10">
        {/* Title Section with Māori Greeting */}
        <div className="text-center mb-12">
          {/* Māori Greeting */}
          <div className="mb-6">
            <p className="text-5xl text-red-700 mb-3">Kia ora!</p>
            <p className="text-3xl text-slate-700">Welcome to the</p>
          </div>

          {/* Traditional Pattern Border */}
          <div className="mb-4 flex justify-center gap-2">
            <div className="w-16 h-2 bg-red-700 rounded-full"></div>
            <div className="w-16 h-2 bg-slate-800 rounded-full"></div>
            <div className="w-16 h-2 bg-red-700 rounded-full"></div>
          </div>

          <h1 className="text-6xl mb-6 text-slate-800 tracking-wide font-bold">
            Rauawaawa Movement Game
          </h1>
          <p className="text-3xl text-slate-600 mb-4">
            Join Kupe's journey to protect the people
          </p>
          <p className="text-2xl text-slate-500 italic">
            Move your hands to defeat the sea creatures
          </p>

          {/* Traditional Pattern Border */}
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-16 h-2 bg-red-700 rounded-full"></div>
            <div className="w-16 h-2 bg-slate-800 rounded-full"></div>
            <div className="w-16 h-2 bg-red-700 rounded-full"></div>
          </div>
        </div>

        {/* Camera Preview Area */}
        <div className="w-full max-w-4xl mb-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-red-200">
            {/* Mock Camera Preview */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-cyan-100 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-24 h-24 text-slate-500 mx-auto mb-4" />
                  <p className="text-3xl text-slate-700 font-semibold">Camera Preview</p>
                  <p className="text-2xl text-slate-600 mt-3">Position yourself comfortably</p>
                </div>
              </div>
              {/* Camera frame indicator with cultural colors */}
              <div className="absolute top-6 left-6 w-20 h-20 border-l-4 border-t-4 border-red-600"></div>
              <div className="absolute top-6 right-6 w-20 h-20 border-r-4 border-t-4 border-red-600"></div>
              <div className="absolute bottom-6 left-6 w-20 h-20 border-l-4 border-b-4 border-red-600"></div>
              <div className="absolute bottom-6 right-6 w-20 h-20 border-r-4 border-b-4 border-red-600"></div>
            </div>
          </div>
        </div>

        {/* Instructions with Māori Cultural Elements */}
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-10 max-w-3xl w-full border-4 border-amber-100">
          <h2 className="text-4xl mb-8 text-red-700 text-center font-bold">
            How to Play | Ngā Tohutohu
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-red-700 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-lg">
                1
              </div>
              <div>
                <p className="text-2xl text-slate-800 leading-relaxed">
                  Stand or sit comfortably in front of the camera
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-red-700 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-lg">
                2
              </div>
              <div>
                <p className="text-2xl text-slate-800 leading-relaxed">
                  Make sure your hands and arms are visible
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-red-700 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-lg">
                3
              </div>
              <div>
                <p className="text-2xl text-slate-800 leading-relaxed">
                  Use slicing motions to defeat the sea creatures, just like Kupe!
                </p>
              </div>
            </div>
          </div>

          {/* Cultural Note */}
          <div className="mt-8 pt-6 border-t-2 border-amber-200">
            <p className="text-xl text-center text-slate-600 italic">
              "Kia kaha - Stay strong on your journey"
            </p>
          </div>
        </div>

        {/* Start Button with Cultural Styling */}
        <div className="relative">
          {/* Koru decorations around button */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full text-red-700">
              <path d="M 50 20 Q 80 20 80 50 Q 80 80 50 80 Q 35 80 35 65 Q 35 50 50 50" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 opacity-30 rotate-180">
            <svg viewBox="0 0 100 100" className="w-full h-full text-red-700">
              <path d="M 50 20 Q 80 20 80 50 Q 80 80 50 80 Q 35 80 35 65 Q 35 50 50 50" fill="currentColor" />
            </svg>
          </div>

          <Button
            onClick={() => navigate("/gameplay")}
            className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-20 py-10 text-4xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center gap-6 border-4 border-amber-300"
          >
            <Hand className="w-12 h-12" />
            Tīmata | Start Game
            <ArrowRight className="w-12 h-12" />
          </Button>
        </div>

        {/* Alternative Gesture Prompt */}
        <p className="text-2xl text-slate-600 mt-8 font-medium">
          Raise your hand when ready
        </p>

        {/* Cultural Blessing */}
        <div className="mt-8 bg-gradient-to-r from-amber-100 to-red-100 rounded-xl px-8 py-4 border-2 border-red-200">
          <p className="text-xl text-red-800 italic">
            Haere tonu - Continue with courage
          </p>
        </div>
      </div>
    </div>
  );
}
