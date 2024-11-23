import { useContext, useState } from "react";
import GameContext from "../contexts/GameContext";
import PropTypes from "prop-types";
import Header from "../components/Header";
import styles from "./Playing.module.css";
import ContextMenu from "../components/ContextMenu";

const Playing = ({ setView }) => {
  const { selectedCharacters, gameTimer, checkCharacter } =
    useContext(GameContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [normalizedCoords, setNormalizedCoords] = useState({ x: 0, y: 0 });

  const handleImageClick = (e) => {
    if (requestLoading) return;

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
          : CORD_Y + menuHeight / 2 + 10;

      setMenuVisible(true);
      setMenuPosition({ x: adjustedX, y: adjustedY });
      normalizeCoords(image, CORD_X, CORD_Y);
    }
  };

  function normalizeCoords(image, x, y) {
    const newX = x / image.width;
    const newY = y / image.height;
    setNormalizedCoords({ x: newX, y: newY });
  }

  const handleCharacterSelect = async (selectedCharacter) => {
    if (requestLoading) return;
    try {
      setRequestLoading(true);
      const result = await checkCharacter(normalizedCoords, selectedCharacter);
      if (result.isGameComplete) {
        setView("board");
      }
    } catch (error) {
      console.error("Error checking character:", error);
    } finally {
      setRequestLoading(false);
      setMenuVisible(false);
    }
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
