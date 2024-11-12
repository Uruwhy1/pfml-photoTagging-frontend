import { useEffect, useContext } from "react";
import GameContext from "../contexts/GameContext";
import PropTypes from "prop-types";

const Start = ({ setView }) => {
  const { selectedCharacters, setSelectedCharacters } = useContext(GameContext);

  useEffect(() => {
    const characters = [
      { name: "Red Dragon", img: "/redDragon.png" },
      { name: "Yellow Fish", img: "/yellowFish.png" },
      { name: "Sleping Dragon", img: "/sleepingDragon.png" },
    ];

    const shuffled = [...characters].sort(() => 0.5 - Math.random());
    setSelectedCharacters(shuffled.slice(0, 3));
  }, [setSelectedCharacters]);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        {selectedCharacters.map((character) => (
          <div key={character.name}>
            <img src={character.img} alt={character.name} width="100" />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setView("playing")}>START GAME</button>
    </div>
  );
};

Start.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Start;
