import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GameProvider } from "./contexts/GameContext.jsx";
import { PopupProvider } from "./contexts/PopupContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PopupProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </PopupProvider>
  </StrictMode>
);
