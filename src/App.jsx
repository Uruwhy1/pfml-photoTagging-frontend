import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
import "./reset.css";
import "./variables.css";

import Start from "./views/Start";
import Playing from "./views/Playing";
import Leaderboard from "./views/Leaderboard";
import { useState } from "react";

function App() {
  const [view, setView] = useState("start");

  return (
    <div className="app-container">
      <Playing setView={setView} />

      <SwitchTransition>
        <CSSTransition key={view} timeout={300} classNames="view" unmountOnExit>
          <>
            {view === "board" && <Leaderboard setView={setView} />}
            {view === "start" && <Start setView={setView} />}
          </>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;
