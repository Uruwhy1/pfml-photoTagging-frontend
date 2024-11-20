import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // prettier-ignore
  const [characters] = useState([
    { id: 1, name: "Sleeping Dragon", img: "/sleepingDragon.png", size: "medium" },
    { id: 2, name: "Red Dragon", img: "/redDragon.png", size: "medium" },
    { id: 3, name: "Yellow Fish", img: "/yellowFish.png", size: "very small" },
    { id: 4, name: "Ship Guy", img: "/shipGuy.png", size: "very small" },
    { id: 5, name: "Teacher", img: "/teacher.png", size: "very small" },
    { id: 6, name: "Cats", img: "/cats.png", size: "very small" },
    { id: 7, name: "Dragon and Human", img: "/dragonAndHuman.png", size: "small" },
    { id: 8, name: "Stupid Face", img: "/stupidFace.png", size: "big" },
  ]);

  // game setup
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    const fetchGameSetup = async () => {
      try {
        const response = await fetch(`${backendUrl}/setup`, {
          method: "POST",
        });
        const data = await response.json();

        setGameId(data.gameId);

        const matchedCharacters = characters
          .filter((character) => data.characterIds.includes(character.id))
          .map((character) => ({
            ...character,
            found: false,
          }));
        setSelectedCharacters(matchedCharacters);
      } catch (error) {
        console.error("Error fetching game setup:", error);
      }
    };

    fetchGameSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // start game
  const [isGameStarted, setIsGameStarted] = useState(false);
  const startGame = (username) => {
    setIsGameStarted(true);
    setGameTimer(0);
    alert(`Game started with username: ${username}`);
  };

  // timer
  const [gameTimer, setGameTimer] = useState(0);
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
        gameId,
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
