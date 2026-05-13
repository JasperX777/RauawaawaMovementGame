import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Hand, Video, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function StartScreen() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [cameraMessage, setCameraMessage] = useState("Tap to preview your camera and get comfortable.");

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraState]);

  const handleCameraPreview = async () => {
    if (cameraState === "loading") return;

    if (streamRef.current) {
      setCameraState("ready");
      setCameraMessage("Position yourself comfortably.");
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play().catch(() => {});
      }
      return;
    }

    try {
      setCameraState("loading");
      setCameraMessage("Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setCameraState("ready");
      setCameraMessage("Position yourself comfortably.");
    } catch (_error) {
      setCameraState("error");
      setCameraMessage("Camera preview unavailable. You can still press Start and allow the camera then.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.28),_transparent_32%),linear-gradient(180deg,_#082f49_0%,_#0f3b5f_38%,_#115e73_72%,_#d8f3ff_100%)] flex flex-col relative overflow-hidden">
      {/* Māori Koru Pattern Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-12">
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-100">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-12 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-100">
          <path d="M 50 10 Q 90 10 90 50 Q 90 90 50 90 Q 30 90 30 70 Q 30 50 50 50" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cyan-100/30 to-transparent" />

      {/* Navigation to Flow Diagram */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="outline"
          onClick={() => navigate("/flow")}
          className="text-lg px-6 py-3 h-auto bg-slate-950/45 text-cyan-50 backdrop-blur-sm border-2 border-cyan-200/45 hover:bg-slate-950/60 shadow-lg"
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
            <p className="text-5xl text-amber-200 mb-3">Kia ora!</p>
            <p className="text-3xl text-cyan-100">Welcome to the</p>
          </div>

          {/* Traditional Pattern Border */}
          <div className="mb-4 flex justify-center gap-2">
            <div className="w-16 h-2 bg-amber-300 rounded-full"></div>
            <div className="w-16 h-2 bg-cyan-100 rounded-full"></div>
            <div className="w-16 h-2 bg-amber-300 rounded-full"></div>
          </div>

          <h1 className="text-6xl mb-6 text-white tracking-wide font-bold">
            Rauawaawa Movement Game
          </h1>
          <p className="text-3xl text-cyan-50 mb-4">
            Join Kupe's journey to protect the people
          </p>
          <p className="text-2xl text-cyan-100/85 italic">
            Move your hands to defeat the sea creatures
          </p>

          {/* Traditional Pattern Border */}
          <div className="mt-6 flex justify-center gap-2">
            <div className="w-16 h-2 bg-amber-300 rounded-full"></div>
            <div className="w-16 h-2 bg-cyan-100 rounded-full"></div>
            <div className="w-16 h-2 bg-amber-300 rounded-full"></div>
          </div>
        </div>

        {/* Camera Preview Area */}
        <div className="w-full max-w-4xl mb-10">
          <button
            type="button"
            onClick={handleCameraPreview}
            className="w-full text-left bg-slate-950/30 rounded-3xl shadow-2xl overflow-hidden border-4 border-cyan-200/35 backdrop-blur-md transition duration-200 hover:border-amber-200/70 hover:shadow-cyan-900/30 focus:outline-none focus:ring-4 focus:ring-cyan-200/35"
          >
            {/* Mock Camera Preview */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-sky-900 to-cyan-800 flex items-center justify-center">
              {cameraState === "ready" ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover scale-x-[-1]"
                />
              ) : null}
              <div className="absolute inset-0 bg-slate-950/20" />
              {cameraState !== "ready" ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-24 h-24 text-cyan-100/80 mx-auto mb-4" />
                    <p className="text-3xl text-white font-semibold">Camera Preview</p>
                    <p className="text-2xl text-cyan-100 mt-3">{cameraMessage}</p>
                  </div>
                </div>
              ) : null}
              {/* Camera frame indicator with cultural colors */}
              <div className="absolute top-6 left-6 w-20 h-20 border-l-4 border-t-4 border-amber-300"></div>
              <div className="absolute top-6 right-6 w-20 h-20 border-r-4 border-t-4 border-amber-300"></div>
              <div className="absolute bottom-6 left-6 w-20 h-20 border-l-4 border-b-4 border-amber-300"></div>
              <div className="absolute bottom-6 right-6 w-20 h-20 border-r-4 border-b-4 border-amber-300"></div>
            </div>
          </button>
        </div>

        {/* Instructions with Māori Cultural Elements */}
        <div className="bg-slate-950/45 rounded-2xl shadow-lg p-10 mb-10 max-w-3xl w-full border-4 border-cyan-200/30 backdrop-blur-md">
          <h2 className="text-4xl mb-8 text-amber-200 text-center font-bold">
            How to Play | Ngā Tohutohu
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-3xl text-slate-950 font-bold shadow-lg">
                1
              </div>
              <div>
                <p className="text-2xl text-cyan-50 leading-relaxed">
                  Stand or sit comfortably in front of the camera
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-3xl text-slate-950 font-bold shadow-lg">
                2
              </div>
              <div>
                <p className="text-2xl text-cyan-50 leading-relaxed">
                  Make sure your hands and arms are visible
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-3xl text-slate-950 font-bold shadow-lg">
                3
              </div>
              <div>
                <p className="text-2xl text-cyan-50 leading-relaxed">
                  Use slicing motions to defeat the sea creatures, just like Kupe!
                </p>
              </div>
            </div>
          </div>

          {/* Cultural Note */}
          <div className="mt-8 pt-6 border-t-2 border-cyan-200/25">
            <p className="text-xl text-center text-cyan-100 italic">
              "Kia kaha - Stay strong on your journey"
            </p>
          </div>
        </div>

        {/* Start Button with Cultural Styling */}
        <div className="relative">
          {/* Koru decorations around button */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-200">
              <path d="M 50 20 Q 80 20 80 50 Q 80 80 50 80 Q 35 80 35 65 Q 35 50 50 50" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 opacity-30 rotate-180">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-200">
              <path d="M 50 20 Q 80 20 80 50 Q 80 80 50 80 Q 35 80 35 65 Q 35 50 50 50" fill="currentColor" />
            </svg>
          </div>

          <Button
            onClick={() => navigate("/gameplay")}
            className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 px-20 py-10 text-4xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center gap-6 border-4 border-amber-200"
          >
            <Hand className="w-12 h-12" />
            Tīmata | Start Game
            <ArrowRight className="w-12 h-12" />
          </Button>
        </div>

        {/* Alternative Gesture Prompt */}
        <p className="text-2xl text-cyan-100 mt-8 font-medium">
          Raise your hand when ready
        </p>

        {/* Cultural Blessing */}
        <div className="mt-8 bg-slate-950/35 rounded-xl px-8 py-4 border-2 border-amber-200/45 backdrop-blur-sm">
          <p className="text-xl text-amber-100 italic">
            Haere tonu - Continue with courage
          </p>
        </div>
      </div>
    </div>
  );
}
