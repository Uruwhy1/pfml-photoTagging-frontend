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
      let data;

      if (localStorage.characters && localStorage.gameId) {
        data = {
          characterIds: JSON.parse(localStorage.characters),
          gameId: localStorage.gameId,
        };
      }

      try {
        if (!data) {
          const response = await fetch(`${backendUrl}/setup`, {
            method: "POST",
          });
          data = await response.json();

          localStorage.characters = JSON.stringify(data.characterIds);
          localStorage.gameId = data.gameId;
        }

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
  const startGame = async (username) => {
    try {
      const response = await fetch(`${backendUrl}/${gameId}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username || getRandomUser(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start the game");
      }

      localStorage.removeItem("gameId");
      localStorage.removeItem("characters");

      setGameTimer(0);
      setIsGameStarted(true);
      return true;
    } catch (error) {
      console.error("Error starting the game:", error);
    }
  };

  function getRandomUser() {
    const randomNames = [
      "PlayerOne",
      "RandomizedName",
      "404NameNotFound",
      "NameSurname",
      "MagicCat",
      "SleepingDragon",
      "BigWhale",
      "YellowFish",
    ];
    return randomNames[Math.floor(Math.random() * randomNames.length)];
  }

  // timer
  const [gameTimer, setGameTimer] = useState(0);
  useEffect(() => {
    if (isGameStarted) {
      const timer = setInterval(() => setGameTimer((time) => time + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isGameStarted]);

  const checkCharacter = async (normalizedCoords, character) => {
    try {
      const response = await fetch(`${backendUrl}/${gameId}/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: normalizedCoords,
          characterId: character.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to check character");
      }

      character.found = true;
      return {
        success: true,
        character,
        isGameComplete: data.message === "Game complete!",
      };
    } catch (error) {
      console.error("Error checking character:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  };

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
        checkCharacter,
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
