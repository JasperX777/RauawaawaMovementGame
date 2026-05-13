import { useEffect } from "react";
import { useNavigate } from "react-router";

const GAME_IFRAME_PATH = "/mori-hero-game/index.html?embed=1";

type EmbeddedGameMessage =
  | {
      source: "mori-hero-game";
      type: "game-finished";
      resultType?: "win" | "lose";
      monstersDefeated?: number;
      score?: number;
      stageReached?: number;
    }
  | {
      source: "mori-hero-game";
      type: "exit-to-home";
    };

export function GameplayScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event: MessageEvent<EmbeddedGameMessage>) => {
      if (event.origin !== window.location.origin) return;
      if (!event.data || event.data.source !== "mori-hero-game") return;

      if (event.data.type === "exit-to-home") {
        navigate("/");
        return;
      }

      if (event.data.type === "game-finished") {
        navigate("/results", {
          state: {
            resultType: event.data.resultType ?? "lose",
            monstersDefeated: event.data.monstersDefeated ?? 0,
            score: event.data.score ?? 0,
            stageReached: event.data.stageReached ?? 1,
          },
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950">
      <iframe
        title="Mori Hero Game"
        src={GAME_IFRAME_PATH}
        className="h-full w-full border-0"
        allow="camera; microphone; autoplay"
      />
    </div>
  );
}
