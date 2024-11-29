import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
import "./reset.css";
import "./variables.css";

import Start from "./views/Start";
import Playing from "./views/Playing";
import Leaderboard from "./views/Leaderboard";
import { useState } from "react";

import Loading from "./views/Loading";

function App() {
  const [view, setView] = useState("loading");

  return (
    <>
      <Playing setView={setView} />

      <SwitchTransition>
        <CSSTransition key={view} timeout={300} classNames="view" unmountOnExit>
          <>
            {view == "loading" && <Loading setView={setView} />}
            {view === "board" && <Leaderboard setView={setView} />}
            {view === "start" && <Start setView={setView} />}
          </>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App;
