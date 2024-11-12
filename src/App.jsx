import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";

import Start from "./views/Start";
import Playing from "./views/Playing";
import Leaderboard from "./views/Leaderboard";

function App() {
  const [view, setView] = useState("start");

  const RenderView = () => {
    switch (view) {
      case "start":
        return <Start setView={setView} />;
      case "playing":
        return <Playing setView={setView} />;
      case "board":
        return <Leaderboard setView={setView} />;
      default:
        return null;
    }
  };

  return (
    <SwitchTransition>
      <CSSTransition key={view} timeout={300} classNames="view" unmountOnExit>
        <div className="view-container">
          <RenderView />
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default App;
