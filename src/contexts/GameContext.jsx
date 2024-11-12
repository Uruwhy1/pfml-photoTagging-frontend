import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [characters] = useState([
    { name: "Sleeping Dragon", img: "/sleepingDragon.png" },
    { name: "Red Dragon", img: "/redDragon.png" },
    { name: "Yellow Fish", img: "/yellowFish.png" },
  ]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameTimer, setGameTimer] = useState(0);

  const chooseCharacters = () => {
    const shuffled = [...characters].sort(() => 0.5 - Math.random());
    setSelectedCharacters(shuffled.slice(0, 3));
  };

  const startGame = () => {
    setIsGameStarted(true);
    setGameTimer(0);
  };

  useEffect(() => {
    if (isGameStarted) {
      const timer = setInterval(() => setGameTimer((time) => time + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isGameStarted]);

  return (
    <GameContext.Provider
      value={{
        characters,
        selectedCharacters,
        setSelectedCharacters,
        isGameStarted,
        startGame,
        gameTimer,
        chooseCharacters,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GameContext;
