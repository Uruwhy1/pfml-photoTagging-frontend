import { useContext, useEffect } from "react";
import GameContext from "../contexts/GameContext";
import PropTypes from "prop-types";

const Start = ({ setView }) => {
  const { startGame, chooseCharacters, selectedCharacters } =
    useContext(GameContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(chooseCharacters, []);

  return (
    <div>
      <h2>Select these characters:</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {selectedCharacters.map((character) => (
          <div key={character.name}>
            <img src={character.img} alt={character.name} width="100" />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          startGame();
          setView("playing");
        }}
      >
        START GAME
      </button>
    </div>
  );
};

Start.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Start;
