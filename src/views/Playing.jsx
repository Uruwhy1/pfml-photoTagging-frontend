import { useContext, useState } from "react";
import GameContext from "../contexts/GameContext";
import PropTypes from "prop-types";
import Header from "../components/Header";
import styles from "./Playing.module.css";
import ContextMenu from "../components/ContextMenu";

const Playing = ({ setView }) => {
  const { selectedCharacters, gameTimer } = useContext(GameContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [normalizedCoords, setNormalizedCoords] = useState({ x: 0, y: 0 });

  const handleImageClick = (e) => {
    const image = e.target.getBoundingClientRect();

    const CORD_X = e.clientX - image.x;
    const CORD_Y = e.clientY - image.y;

    console.log(CORD_X);
    if (menuVisible) setMenuVisible(false);
    else {
      setMenuVisible(true);
      setMenuPosition({ x: CORD_X + 5, y: CORD_Y + 145 });

      normalizeCoords(image, CORD_X, CORD_Y);
    }
  };

  function normalizeCoords(image, x, y) {
    const newX = x / image.width;
    const newY = y / image.height;

    setNormalizedCoords({ x: newX, y: newY });
  }

  const handleCharacterSelect = (character) => {
    alert(
      `Selected character: ${character.name}, at coords: ${normalizedCoords}`
    );
    setMenuVisible(false);
  };

  return (
    <>
      <Header selectedCharacters={selectedCharacters} gameTimer={gameTimer} />
      <main className={styles.container}>
        <img
          onClick={(e) => handleImageClick(e)}
          className={styles.image}
          src="/island.png"
          alt=""
        />
        {menuVisible && (
          <ContextMenu
            items={selectedCharacters}
            position={menuPosition}
            onSelect={handleCharacterSelect}
          />
        )}
      </main>
    </>
  );
};

Playing.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default Playing;
