import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Hand, Shield } from "lucide-react";
import { Button } from "./ui/button";

type WeaponId = "knife" | "axe" | "none";

const weapons: Array<{
  id: WeaponId;
  name: string;
  subtitle: string;
  image?: string;
}> = [
  {
    id: "knife",
    name: "Knife",
    subtitle: "Fast blue palm slash",
    image: "/mori-hero-game/img/weapon/knif.png",
  },
  {
    id: "axe",
    name: "Axe",
    subtitle: "Wide heavy sweep",
    image: "/mori-hero-game/img/weapon/axe.png",
  },
  {
    id: "none",
    name: "Hands",
    subtitle: "Classic hand trails",
  },
];

export function WeaponSelectScreen() {
  const navigate = useNavigate();
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponId>("knife");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.24),_transparent_34%),linear-gradient(180deg,_#082f49_0%,_#0f3b5f_44%,_#0f766e_100%)] px-6 py-8 text-cyan-50">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
            className="h-auto border-2 border-cyan-100/35 bg-slate-950/35 px-5 py-3 text-lg text-cyan-50 backdrop-blur-sm hover:bg-slate-950/55"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <div className="rounded-full border border-amber-200/45 bg-slate-950/35 px-5 py-2 text-lg text-amber-100 backdrop-blur-sm">
            Choose before camera loading
          </div>
        </div>

        <main className="flex flex-1 flex-col items-center justify-center gap-10 py-10">
          <div className="text-center">
            <p className="mb-4 text-3xl text-amber-200">Prepare your strike</p>
            <h1 className="text-6xl font-bold tracking-wide text-white">Choose Your Weapon</h1>
            <p className="mt-5 text-2xl text-cyan-100/90">
              Pick a movement style, then the pose model will load.
            </p>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-3">
            {weapons.map((weapon) => {
              const isSelected = selectedWeapon === weapon.id;
              return (
                <button
                  key={weapon.id}
                  type="button"
                  onClick={() => setSelectedWeapon(weapon.id)}
                  aria-pressed={isSelected}
                  className={[
                    "group relative min-h-[320px] rounded-2xl border-4 p-7 text-left shadow-2xl transition duration-200",
                    "bg-slate-950/35 backdrop-blur-md hover:-translate-y-1 hover:bg-slate-950/45",
                    isSelected
                      ? "border-amber-200 shadow-amber-300/20"
                      : "border-cyan-100/25 shadow-slate-950/20",
                  ].join(" ")}
                >
                  <div className="absolute right-5 top-5 rounded-full border border-cyan-100/25 bg-slate-950/35 p-3">
                    {weapon.id === "none" ? (
                      <Hand className="h-7 w-7 text-cyan-100" />
                    ) : (
                      <Shield className="h-7 w-7 text-amber-100" />
                    )}
                  </div>

                  <div className="flex h-40 items-center justify-center">
                    {weapon.image ? (
                      <img
                        src={weapon.image}
                        alt=""
                        className="max-h-36 object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.45)] transition duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-cyan-100/50 bg-cyan-100/10">
                        <Hand className="h-16 w-16 text-cyan-100" />
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <h2 className="text-4xl font-bold text-white">{weapon.name}</h2>
                    <p className="mt-3 text-xl text-cyan-100">{weapon.subtitle}</p>
                  </div>

                  <div
                    className={[
                      "mt-8 h-3 rounded-full transition",
                      isSelected ? "bg-amber-200" : "bg-cyan-100/20",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            onClick={() => navigate(`/gameplay?weapon=${selectedWeapon}`)}
            className="h-auto rounded-2xl border-4 border-amber-200 bg-gradient-to-r from-cyan-400 to-teal-400 px-16 py-7 text-3xl font-bold text-slate-950 shadow-2xl transition-all duration-200 hover:from-cyan-300 hover:to-teal-300"
          >
            Continue
            <ArrowRight className="ml-4 h-10 w-10" />
          </Button>
        </main>
      </div>
    </div>
  );
}
