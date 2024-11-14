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
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const menuWidth = 300;
    const menuHeight = 258;

    const CORD_X = e.clientX - image.x;
    const CORD_Y = e.clientY - image.y;

    if (menuVisible) {
      setMenuVisible(false);
    } else {
      const adjustedX =
        e.clientX > viewportWidth / 2 ? CORD_X - menuWidth - 5 : CORD_X + 5;

      const adjustedY =
        e.clientY > viewportHeight / 2
          ? CORD_Y - menuHeight / 2
          : CORD_Y + menuHeight / 2 + 10; // not sure why I need to add offset here

      setMenuVisible(true);
      setMenuPosition({ x: adjustedX, y: adjustedY });

      normalizeCoords(image, CORD_X, CORD_Y);
    }
  };

  function normalizeCoords(image, x, y) {
    const newX = x / image.width;
    const newY = y / image.height;

    console.log(newX, newY);
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
