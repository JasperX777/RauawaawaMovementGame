import { useNavigate } from "react-router";
import { ArrowRight, Home, Play, Target, Trophy, Clock, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function FlowDiagram() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b-2 border-slate-200 px-8 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl text-slate-800">User Flow Diagram</h1>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="text-xl px-6 py-3 h-auto"
          >
            Back to Start
          </Button>
        </div>
      </div>

      {/* Flow Diagram Content */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-6xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-slate-200">
            <h2 className="text-3xl text-slate-800 mb-12 text-center">
              Rauawaawa Movement Game - User Journey
            </h2>

            {/* Flow Steps */}
            <div className="space-y-8">
              {/* Step 1: Start Screen */}
              <div className="flex items-center gap-6">
                <div className="flex-1 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl p-8 border-4 border-cyan-200 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center">
                      <Home className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-slate-800 mb-3">1. Start Screen</h3>
                      <ul className="text-xl text-slate-700 space-y-2">
                        <li>• View game title and subtitle</li>
                        <li>• See camera preview area</li>
                        <li>• Read clear instructions</li>
                        <li>• Position yourself in camera frame</li>
                        <li>• Click "Start Game" button</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <ArrowRight className="w-12 h-12 text-slate-400" />
                </div>
              </div>

              {/* Step 2: Camera Ready */}
              <div className="flex items-center gap-6">
                <div className="flex-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 border-4 border-blue-200 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-slate-800 mb-3">2. Camera Ready</h3>
                      <ul className="text-xl text-slate-700 space-y-2">
                        <li>• Camera activates and begins tracking</li>
                        <li>• Game prepares to detect hand movements</li>
                        <li>• Timer starts counting down (60 seconds)</li>
                        <li>• Player gets ready to move</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <ArrowRight className="w-12 h-12 text-slate-400" />
                </div>
              </div>

              {/* Step 3: Movement Detection & Gameplay */}
              <div className="flex items-center gap-6">
                <div className="flex-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 border-4 border-purple-200 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-slate-800 mb-3">3. Gameplay - Defeat Sea Monsters</h3>
                      <ul className="text-xl text-slate-700 space-y-2">
                        <li>• Sea monsters (Taniwha) appear from screen edges</li>
                        <li>• Camera detects hand/arm movements</li>
                        <li>• Player makes slicing motions to attack</li>
                        <li>• Each defeated monster increases score</li>
                        <li>• Timer counts down to zero</li>
                        <li>• Multiple monsters can appear at once</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <ArrowRight className="w-12 h-12 text-slate-400" />
                </div>
              </div>

              {/* Step 4: Time's Up Transition */}
              <div className="flex items-center gap-6">
                <div className="flex-1 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 border-4 border-orange-200 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-slate-800 mb-3">4. Time Limit Reached</h3>
                      <ul className="text-xl text-slate-700 space-y-2">
                        <li>• Timer reaches zero</li>
                        <li>• Game calculates total monsters defeated</li>
                        <li>• Final score is tallied</li>
                        <li>• Transition to results screen</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <ArrowRight className="w-12 h-12 text-slate-400" />
                </div>
              </div>

              {/* Step 5: Results */}
              <div className="flex items-center gap-6">
                <div className="flex-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-8 border-4 border-emerald-200 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-slate-800 mb-3">5. Results Screen</h3>
                      <ul className="text-xl text-slate-700 space-y-2">
                        <li>• Display total sea monsters defeated</li>
                        <li>• Show final score achieved</li>
                        <li>• Provide positive encouragement message</li>
                        <li>• Performance-based feedback</li>
                        <li>• Options: "Play Again" or "Return Home"</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-12"></div>
              </div>

              {/* Loop Back Indicator */}
              <div className="flex items-center justify-center gap-4 pt-6">
                <div className="flex items-center gap-3 bg-slate-100 rounded-full px-8 py-4 border-2 border-slate-300">
                  <Zap className="w-6 h-6 text-slate-600" />
                  <span className="text-xl text-slate-700">Player can play again (returns to Gameplay Screen)</span>
                </div>
              </div>
            </div>

            {/* Game Mechanics Box */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-4 border-blue-200 rounded-2xl p-8">
              <h3 className="text-2xl text-slate-800 mb-4">Core Game Mechanics</h3>
              <div className="grid grid-cols-2 gap-6 text-xl text-slate-700">
                <div>
                  <p className="mb-2"><strong>Objective:</strong> Defeat as many sea monsters as possible</p>
                  <p className="mb-2"><strong>Time Limit:</strong> 60 seconds per round</p>
                  <p><strong>Monsters:</strong> Appear from screen edges randomly</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Controls:</strong> Hand/arm slicing movements</p>
                  <p className="mb-2"><strong>Scoring:</strong> +100 points per monster</p>
                  <p><strong>Win Condition:</strong> Survive time limit</p>
                </div>
              </div>
            </div>

            {/* Key Features Box */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-4 border-purple-200 rounded-2xl p-8">
              <h3 className="text-2xl text-slate-800 mb-4">Design Considerations for Elderly Users</h3>
              <div className="grid grid-cols-2 gap-6 text-xl text-slate-700">
                <div>
                  <p className="mb-2">✓ Extra large, clear text and buttons</p>
                  <p className="mb-2">✓ High contrast sea-themed colors</p>
                  <p>✓ Simple, intuitive navigation</p>
                </div>
                <div>
                  <p className="mb-2">✓ Calm, friendly visual design</p>
                  <p className="mb-2">✓ Clear movement feedback</p>
                  <p>✓ Culturally respectful Māori elements</p>
                </div>
              </div>
            </div>

            {/* Interactive Demo Links */}
            <div className="mt-10 pt-8 border-t-2 border-slate-200">
              <p className="text-2xl text-slate-700 mb-6 text-center">Try the Interactive Prototype:</p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => navigate("/")}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-xl rounded-xl flex items-center gap-3"
                >
                  <Play className="w-6 h-6" />
                  Screen 1: Start
                </Button>
                <Button
                  onClick={() => navigate("/gameplay")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xl rounded-xl flex items-center gap-3"
                >
                  <Target className="w-6 h-6" />
                  Screen 2: Gameplay
                </Button>
                <Button
                  onClick={() => navigate("/results")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-xl rounded-xl flex items-center gap-3"
                >
                  <Trophy className="w-6 h-6" />
                  Screen 3: Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { RotateCcw } from "lucide-react";