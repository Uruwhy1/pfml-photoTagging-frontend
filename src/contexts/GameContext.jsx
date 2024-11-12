import { createContext, useState } from "react";
import PropTypes from "prop-types";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  return (
    <GameContext.Provider value={{ selectedCharacters, setSelectedCharacters }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GameContext;
