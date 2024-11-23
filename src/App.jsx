import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
import "./reset.css";
import "./variables.css";

import Start from "./views/Start";
import Playing from "./views/Playing";
import Leaderboard from "./views/Leaderboard";
import { useState } from "react";

import { useContext } from "react";
import GameContext from "./contexts/GameContext";

function App() {
  const { gameId } = useContext(GameContext);
  const [view, setView] = useState("start");

  if (!gameId) {
    return <div>Loading...</div>; // Display loading while game setup is being fetched
  }

  return (
    <>
      <Playing setView={setView} />

      <SwitchTransition>
        <CSSTransition key={view} timeout={300} classNames="view" unmountOnExit>
          <>
            {view === "board" && <Leaderboard setView={setView} />}
            {view === "start" && <Start setView={setView} />}
          </>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App;
