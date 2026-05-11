import { createBrowserRouter } from "react-router";
import { StartScreen } from "./components/StartScreen";
import { GameplayScreen } from "./components/GameplayScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { FlowDiagram } from "./components/FlowDiagram";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: StartScreen,
  },
  {
    path: "/gameplay",
    Component: GameplayScreen,
  },
  {
    path: "/results",
    Component: ResultsScreen,
  },
  {
    path: "/flow",
    Component: FlowDiagram,
  },
]);
